import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dot from '../Dot';

const DotGroupContainer = styled.div.attrs({
  className: 'DotGroup',
  'data-testid': 'dot-group',
})`
  display: flex;
  width: min-content;
`;

/**
 * ## Features
 *
 * * Allow you to set the value of the dot group.
 * * Allow you to set the maximum number of dots.
 *   Some character values have a different max like Familiar.
 * * Allow you to include a dot to zero out the value for things like abilities.
 * * Respond to a player's click to get the new value.
 *
 * ## Description
 *
 * In exalted many character values are described in "dots". Usually 1-5, but sometimes 0
 * or a different max than 5 is allowed. Players normally "think" of their characters values
 * in dots, and all the rules talk in dots. This component's goal is to allow the players to
 * interface with character's values in a familiar way that will be intuitive to anyone that's
 * looked an exalted character sheet.
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
