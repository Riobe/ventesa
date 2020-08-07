import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dot from '../Dot';

const DotGroupContainer = styled.div`
  display: flex;
  width: min-content;
`;

/**
 * Handles attributes, abilities, merits, or anything that can be counted from 1 to 5. Can
 * optionally allow the dot group to be zeroed out.
 */
function DotGroup({ value, includeZero, maxDots, onValueChange }) {
  // Create an array with values 1 through 5.
  const dots = [...Array(maxDots).keys()].map(i => i + 1);

  return (
    <DotGroupContainer className="DotGroup">
      {includeZero && <Dot zero={true} onClick={() => onValueChange(0)} />}
      {dots.map(dotValue => (
        <Dot
          key={dotValue}
          checked={dotValue <= value}
          onClick={() => onValueChange(dotValue)}
        />
      ))}
    </DotGroupContainer>
  );
}

DotGroup.propTypes = {
  value: PropTypes.number.isRequired,
  includeZero: PropTypes.bool.isRequired,
  maxDots: PropTypes.number.isRequired,
  onValueChange: PropTypes.func,
};

DotGroup.defaultProps = {
  value: 0,
  includeZero: false,
  maxDots: 5,
};

export default DotGroup;
