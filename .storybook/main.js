module.exports = {
  stories: ['../src/**/*.stories.js', '../**/*.mdx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
};
