import styled from 'styled-components';

import { bgColor } from '../../../theme';

const ExpandableNav = styled.div`
  height: 100%;
  overflow: hidden;
  max-width: 55px;
  width: 16rem;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 28px;
  padding-bottom: 15px;

  display: flex;
  flex-direction: column;

  z-index: 20;

  background-color: ${bgColor('nav')};

  transition: max-width 0.3s, right 0.3s;

  &:hover {
    max-width: calc(16rem + 55px);
  }
`;

export default ExpandableNav;
