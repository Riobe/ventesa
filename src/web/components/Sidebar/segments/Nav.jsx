import styled from 'styled-components';

import { accent, bgColor } from '../../../theme';

const Nav = styled.section`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.75rem 0;

  color: white;

  background-color: ${bgColor('nav')};

  svg:hover {
    color: ${accent('primary')};
  }
`;

export default Nav;
