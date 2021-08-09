import React from 'react';
import PropTypes from 'prop-types';

import { DotContainer } from './segments';

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
