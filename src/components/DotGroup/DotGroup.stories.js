import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';

import styled from 'styled-components';
import DotGroup from './DotGroup';

export default {
  title: 'Components/DotGroup',
  component: DotGroup,
  parameters: {
    componentSubtitle:
      'The DotGroup measures most character values in Exalted.',
  },
};

const HorizontalDiv = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const ToggleHeader = styled.h1`
  margin-right: 10px;
`;

// Stories
export const Example = () => (
  <DotGroup
    value={number('Dots', 2, { range: true, min: 0, max: 5, step: 1 })}
    includeZero={boolean('Include Zero?', false)}
    maxDots={number('Max Dots', 5, { range: true, min: 1, max: 5, step: 1 })}
    onValueChange={action('onValueChange')}
  />
);

export const Attribute = () => {
  const [value, setValue] = useState(1);
  const onValueChange = useCallback(action('onValueChange'));

  return (
    <HorizontalDiv>
      <ToggleHeader>Strength</ToggleHeader>
      <DotGroup
        value={value}
        includeZero={false}
        onValueChange={value => {
          setValue(value);
          onValueChange(value);
        }}
      />
    </HorizontalDiv>
  );
};

export const Ability = () => {
  const [value, setValue] = useState(1);
  const onValueChange = useCallback(action('onValueChange'));

  return (
    <HorizontalDiv>
      <ToggleHeader>Ride</ToggleHeader>
      <DotGroup
        value={value}
        includeZero={true}
        onValueChange={value => {
          setValue(value);
          onValueChange(value);
        }}
      />
    </HorizontalDiv>
  );
};

export const Merit = () => {
  const [value, setValue] = useState(1);
  const onValueChange = useCallback(action('onValueChange'));

  return (
    <HorizontalDiv>
      <ToggleHeader>Familiar</ToggleHeader>
      <DotGroup
        value={value}
        includeZero={false}
        maxDots={3}
        onValueChange={value => {
          setValue(value);
          onValueChange(value);
        }}
      />
    </HorizontalDiv>
  );
};
