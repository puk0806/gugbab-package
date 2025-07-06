import { resolve } from 'path';
import { mergeConfig } from 'vite';

const UI_PATH = resolve('../../packages/ui');
const ICONS_PATH = resolve('../../packages/icons');

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return mergeConfig({
      ...config,
      resolve: {
        alias: [
          {
            find: '@components',
            replacement: `${UI_PATH}/src/components`,
          },
          {
            find: '@const',
            replacement: `${UI_PATH}/src/const`,
          },
          {
            find: '@styles',
            replacement: `${UI_PATH}/src/styles`,
          },
          {
            find: '@types',
            replacement: `${UI_PATH}/src/types`,
          },
          {
            find: '@icons',
            replacement: `${ICONS_PATH}/dist`,
          },
        ],
      },
      define: {
        'process.env': {},
      },
      css: {
        postcss: null,
      },
    });
  },
};

export default config;
