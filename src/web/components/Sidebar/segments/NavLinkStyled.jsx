import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { accent } from '../../../theme';

const NavLinkStyled = styled(NavLink)`
  display: grid;
  grid-template-columns: 55px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 30px;

  justify-items: center;
  align-items: center;

  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${accent('primary')};

    cursor: pointer;
  }

  &.active {
    color: ${accent('primary')};
    border-right: 3px solid ${accent('primary')};
  }
`;

export default NavLinkStyled;
