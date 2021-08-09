import styled from 'styled-components';

import { bgColor } from '../../../theme';

const NotchedBoxContent = styled.div`
  --notchSize: ${props => props.notchSize};
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

export default NotchedBoxContent;
