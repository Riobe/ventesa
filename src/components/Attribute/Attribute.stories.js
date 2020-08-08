import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number } from '@storybook/addon-knobs';

import Attribute from './Attribute';

export default {
  title: 'Presentation/Attribute',
  component: Attribute,
  parameters: {
    componentSubtitle: 'An Attribute row for an Exalted character.',
  },
};

// Stories
export const Documentation = () => (
  <div
    style={{
      width:
        number('Container Width:', 100, {
          range: true,
          min: 10,
          max: 100,
          step: 1,
        }) + '%',
    }}
  >
    <Attribute
      name={text('Attribute Name:', 'Intelligence')}
      value={number('Attribute Value:', 1, {
        range: true,
        min: 1,
        max: 5,
        step: 1,
      })}
      onValueChange={action('onValueChange')}
    />
  </div>
);
