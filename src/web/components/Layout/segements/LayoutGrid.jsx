import styled from 'styled-components';

import { bgColor, breakpoint, BREAKPOINT_SM } from '../../../theme';

const LayoutGrid = styled.div`
  height: 100%;

  margin: 0 auto;

  background-color: ${bgColor('primary')};

  display: grid;

  min-width: ${breakpoint(BREAKPOINT_SM)};

  min-height: 660px;

  grid:
    4rem auto /
    55px auto 18.75rem;

  grid-template-areas:
    'title  title   title'
    'nav    content chat';
`;

export default LayoutGrid;
