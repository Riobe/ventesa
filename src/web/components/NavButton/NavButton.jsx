import React from 'react';
import { useTheme } from '@chakra-ui/core';

import { NavButtonBase } from './segments';

/**
 * Handles navigation in multi-action buttons
 */
const NavButton = React.forwardRef((props, ref) => {
  const theme = useTheme();

  return <NavButtonBase ref={ref} theme={theme} {...props} />;
});

NavButton.displayName = 'NavButton';

export default NavButton;
