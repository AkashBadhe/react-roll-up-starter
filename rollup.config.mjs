// rollup.config.js
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import replace from '@rollup/plugin-replace';
import fs from 'fs';
import path from 'path';

// Function to dynamically generate entry points
const generateEntryPoints = (dir) => {
  const entries = {};

  const traverseDirectory = (currentDir) => {
    const files = fs.readdirSync(currentDir);
    let hasIndexFile = false;

    files.forEach(file => {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (stat.isFile() && file === 'index.ts') {
        const relativePath = path.relative(dir, path.dirname(fullPath));
        const name = relativePath.replace(/\\/g, '/');
        entries[name] = fullPath;
        hasIndexFile = true;
      }
    });

    if (!hasIndexFile) {
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && file.endsWith('.ts') && !file.endsWith('.stories.tsx') && !file.endsWith('.test.tsx')) {
          const relativePath = path.relative(dir, path.dirname(fullPath));
          const name = relativePath.replace(/\\/g, '/');
          entries[name] = fullPath;
        }
      });
    }
  };

  traverseDirectory(dir);
  return entries;
};
const componentEntries = generateEntryPoints('src/components');

console.log('componentEntries: ', componentEntries);

export default [
  {
    input: {
      main: "src/index.ts",
      ...componentEntries,
      // Add more components as needed
    },
    external: ["styled-components", 'react', 'react-dom'],
    output: [
      {
        dir: 'dist',
        format: "cjs",
        sourcemap: true,
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
      {
        dir: 'dist',
        format: "esm",
        sourcemap: true,
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
    ],
  },
  {
    input: "./src/jsComponents/index.tsx",
    output: {
      file: "dist/js-react-components.min.js",
      format: 'iife',
      name: 'TemplateLib',
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "rollup-react": "rollupReact"
      },
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
    external: ["styled-components", 'react', 'react-dom'],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
