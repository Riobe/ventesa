import { theme } from '@chakra-ui/core';

import icons from './icons';

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...icons
  }
};

export default customTheme;
