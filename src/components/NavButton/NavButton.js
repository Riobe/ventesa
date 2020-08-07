import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@chakra-ui/core';

const color = colorName => ({ theme }) => theme.colors[colorName];

const NavButtonBase = styled.button`
  padding: 0.5rem 0.8rem;

  border-radius: 0.5rem;
  border: 1px solid ${color('backgroundDark')};
  outline: none;
  box-shadow: 0 0 0 0.25rem ${color('backgroundDark')};

  color: ${color('textLight')};
  background-color: ${color('backgroundDark')};

  &:focus {
    border: 1px solid ${color('solarGold')};
  }

  &.active {
    background-color: ${color('solarGold')};
  }
`;

/**
 * Handles navigation in multi-action buttons
 */
const NavButton = React.forwardRef((props, ref) => {
  const theme = useTheme();

  return <NavButtonBase ref={ref} theme={theme} {...props} />;
});

export default NavButton;
