import styled from 'styled-components';

import { bgColor } from '../../../theme';

const ExpandArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid ${bgColor('nav')};

  position: absolute;
  right: -15px;
  top: 70px;

  z-index: 10;
`;

export default ExpandArrow;
