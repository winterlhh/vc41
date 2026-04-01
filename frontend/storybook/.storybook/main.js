/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
};
