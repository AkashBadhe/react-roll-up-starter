import type { Preview } from "@storybook/react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Change Theme',
      defaultValue: 'cox-resi',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['cox-resi', 'cox-busi'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div className={context.globals.theme} style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
