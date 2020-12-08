import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, useTheme } from '@chakra-ui/core';
import { accent, bgColor } from '../../theme';

const NotchSize = '35px';

const NotchedBoxContainer = styled.div`
  position: relative;
  padding: 2px;
  margin-bottom: 25px;
`;

const NotchedBoxContent = styled.div`
  --notchSize: ${NotchSize};
  background-color: ${bgColor('primary')};
  color: white;
  padding: 2em;
  position: relative;
  z-index: 1;

  text-align: center;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    100% 0%,
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% 100%
  );
`;
const NotchedBoxBorder = styled.div`
  --notchSize: ${NotchSize};
  background-color: #adadad;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    100% 0%,
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% 100%
  );
`;

function NotchedBox({ children }) {
  const theme = useTheme();

  return (
    <NotchedBoxContainer theme={theme}>
      <NotchedBoxContent theme={theme}>{children}</NotchedBoxContent>
      <NotchedBoxBorder theme={theme} />
    </NotchedBoxContainer>
  );
}

NotchedBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotchedBox;
