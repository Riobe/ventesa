import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import Dot from './Dot';

const storybookConfig = {
  title: 'Components/Dot',
  component: Dot,
  parameters: {
    componentSubtitle: 'The basic Dot component of an Exalted character.',
  },
};

export default storybookConfig;

// Stories
export const Example = () => (
  <Dot
    checked={boolean('Is Checked?', false)}
    zero={boolean('Is Zero Dot?', false)}
  />
);
