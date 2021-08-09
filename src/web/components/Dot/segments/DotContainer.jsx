import styled from 'styled-components';

const defaultSize = '0.75rem';

const DotContainer = styled.div`
  width: ${defaultSize};
  height: ${defaultSize};
  border: 0.2rem solid black;
  border-radius: 50%;
  position: relative;
  background-color: transparent;

  cursor: pointer;

  ${({ checked }) =>
    /* Checked needs to stay higher than zero so that zero takes precendence */
    checked &&
    `
  background-color: black;
  `}

  ${({ zero }) =>
    zero &&
    `
  background-color: transparent;
  border: 0.2rem dashed black;

  &::before {
    position: absolute;
    top: 0;
    right: -0.3rem;
    content: "\\274c";
    font-size: 1rem; 
    color: rgba(255, 0, 0, .45);
    line-height: ${defaultSize};
  }
  `}
`;

export default DotContainer;
