import React from 'react';
import { useTheme } from '@chakra-ui/core';

import { VerticalDividerElement } from './segments';

function VerticalDivider() {
  const theme = useTheme();

  return <VerticalDividerElement theme={theme} />;
}

export default VerticalDivider;
