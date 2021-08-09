import React from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/core';

import {
  NotchedBoxBorder,
  NotchedBoxContent,
  NotchedBoxContainer,
} from './segments';

function NotchedBox({ children, notchSize }) {
  const theme = useTheme();

  return (
    <NotchedBoxContainer theme={theme}>
      <NotchedBoxContent theme={theme} notchSize={notchSize}>
        {children}
      </NotchedBoxContent>
      <NotchedBoxBorder theme={theme} notchSize={notchSize} />
    </NotchedBoxContainer>
  );
}

NotchedBox.propTypes = {
  children: PropTypes.node.isRequired,
  notchSize: PropTypes.string.isRequired,
};

NotchedBox.defaultProps = {
  notchSize: '35px',
};

export default NotchedBox;
