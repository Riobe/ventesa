import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

const PanelDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.background.panel};
`;

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
