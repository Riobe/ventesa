import styled from 'styled-components';

const color = colorName => ({ theme }) => theme.colors[colorName];

const NavButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0.25rem;
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

  &:hover {
    background-color: #444;
  }

  &.active {
    background-color: ${color('backgroundPrimary')};
  }
`;

export default NavButtonBase;
