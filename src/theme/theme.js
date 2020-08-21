import { theme } from '@chakra-ui/core';

import * as customIcons from './icons';

const customTheme = {
  ...theme,
  breakpoints: [
    /* Converting to em units at default pixel size of 16px. */
    '48em' /* 768px converted */,
    '64em' /* 1024 converted */,
  ],
  colors: {
    ...theme.colors,
    background: {
      primary: '#262626',
      panel: '#333333',
      nav: '#404040',
      button: '#666666',
    },
    text: {
      normal: 'white',
    },
    solarGold: 'rgb(249, 180, 37)',
    accent: {
      primary: '#33CC7B',
    },
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

export const { colors, breakpoints, icons } = customTheme;

export default customTheme;
