import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/core';

import { PanelDiv } from './segments';

function Panel({ children, ...props }) {
  const theme = useTheme();

  return (
    <PanelDiv theme={theme} {...props}>
      {children}
    </PanelDiv>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
};

export default Panel;
