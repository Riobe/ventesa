import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DotGroup from '../DotGroup';

const AttributeRow = styled.div.attrs({
  className: 'AttributeRow',
})`
  display: flex;
  justify-content: space-between;
`;

const AttributeLabel = styled.label.attrs({
  className: 'AttributeLabel',
})`
  font-weight: 800;
`;

/**
 * An `Attribute` in Exalted is a value between 1-5. It cannot have a
 * value of 0. It is implemented by labeling a `DotGroup` and is intended
 * to be placed in a container like a column or row, as it will take up
 * all of the horizontal space it can.
 */
function Attribute({ name, value, onValueChange }) {
  const attributeId = `attribute-${name}`;
  return (
    <AttributeRow>
      <AttributeLabel id={attributeId}>{name}</AttributeLabel>
      <DotGroup
        aria-labelledby={attributeId}
        value={value}
        onValueChange={onValueChange}
      />
    </AttributeRow>
  );
}

Attribute.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func,
};

Attribute.defaultProps = {
  value: 1,
};

export default Attribute;
