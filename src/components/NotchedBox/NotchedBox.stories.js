import React from 'react';
import NotchedBox from './NotchedBox';

import { number } from '@storybook/addon-knobs';

export default {
  title: 'Components/NotchedBox',
  component: NotchedBox,
  parameters: {
    componentSubtitle: 'This is a box with notched corners',
  },
};

export const NotchedExample = () => (
  <NotchedBox
    NotchSize={number('Notch Size', 35, {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    })}
  />
);
