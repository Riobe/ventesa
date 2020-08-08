import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const defaultSize = '0.75rem';

const DotDiv = styled.div.attrs({
  className: 'Dot',
  // In practice a single dot would be a checkbox, but they're
  // only really intended for use in a DotGroup, which will act as a
  // radiogroup, and not on their own.
  //
  // See Also: https://www.w3.org/TR/wai-aria-1.1/#radio
  role: 'radio',
})`
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
    bottom: 0;
    left: 0;
    right: 0;
    content: "\\274c";
    font-size: 1rem; 
    color: rgba(255, 0, 0, .45);
    line-height: ${defaultSize};
    text-align: center;
  }
  `}
`;

/**
 * Use `Dot` to represent an individual point in some value on a character.
 */
function Dot(props) {
  return (
    <DotDiv aria-checked={props.checked} {...props} />
  );
}

Dot.propTypes = {
  checked: PropTypes.bool.isRequired,
  zero: PropTypes.bool.isRequired,
};

Dot.defaultProps = {
  checked: false,
  zero: false,
};

export default Dot;
