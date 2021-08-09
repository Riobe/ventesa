import React from 'react';
import PropTypes from 'prop-types';
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

/**
 * Use `Dot` to represent an individual point in some value on a character. This will
 * likely not often be used alone, but mostly in a `DotGroup` to represent attributes,
 * abilities, merits, etc.
 */
function Dot(props) {
  // In practice a single dot would be a checkbox, but they're
  // only really intended for use in a DotGroup, which will act as a
  // radiogroup, and not on their own.
  //
  // See Also: https://www.w3.org/TR/wai-aria-1.1/#radio
  return (
    <DotContainer
      aria-checked={props.checked}
      className="Dot"
      role="radio"
      {...props}
    />
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
