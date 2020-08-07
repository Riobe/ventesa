import { theme } from '@chakra-ui/core';

import icons from './icons';

const customTheme = {
  ...theme,
  breakpoints: [
    /* Converting to em units at default pixel size of 16px. */
    '48em' /* 768px converted */,
    '64em' /* 1024 converted */,
  ],
  colors: {
    ...theme.colors,
    backgroundPrimary: '#666',
    backgroundDark: '#333',
    textLight: '#EEE',
    solarGold: 'rgb(249, 180, 37)',
  },
  icons: {
    ...theme.icons,
    ...icons,
  },
};

export const { colors } = customTheme;

export default customTheme;
