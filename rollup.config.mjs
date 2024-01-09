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
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: ["react", "styled-components"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
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
    external: [],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
