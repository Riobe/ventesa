import { theme } from '@chakra-ui/core';

import * as customIcons from './icons';

const customTheme = {
  ...theme,
  breakpoints: [
    /* Converting to em units at default pixel size of 16px. */
    '768px', // iPad width
    '960px', // half of a 1920 screen
    '1280px', // large screen
  ],
  colors: {
    ...theme.colors,
    background: {
      primary: '#262626',
      panel: '#333333',
      sidebar: '#1A1A1A',
    },
    border: {
      chat: '#808080',
      button: '#666666',
    },
    text: {
      normal: 'white',
    },
    solarGold: 'rgb(249, 180, 37)',
    accent: {
      primary: '#056F9C',
    },
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

export const BREAKPOINT_SM = 0;
export const BREAKPOINT_MD = 1;
export const BREAKPOINT_LG = 2;

export const { colors, breakpoints, icons } = customTheme;

export default customTheme;
