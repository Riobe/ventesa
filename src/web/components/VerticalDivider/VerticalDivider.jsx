import React from 'react';
import { useTheme } from '@chakra-ui/react';

import { VerticalDividerElement } from './segments';

function VerticalDivider() {
  const theme = useTheme();

  return <VerticalDividerElement theme={theme} />;
}

export default VerticalDivider;
