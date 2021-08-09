import styled from 'styled-components';

const NotchedBoxBorder = styled.div`
  --notchSize: ${props => props.notchSize};
  background-color: #adadad;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;

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

export default NotchedBoxBorder;
