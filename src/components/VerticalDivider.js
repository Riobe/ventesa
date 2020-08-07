import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

const VerticalDividerElement = styled.div`
  margin: auto 1rem;

  height: 80%;
  width: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 3px;
`;

function VerticalDivider() {
  const theme = useTheme();

  return <VerticalDividerElement theme={theme} />;
}

export default VerticalDivider;
