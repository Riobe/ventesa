import React from 'react';
import NotchedBox from './NotchedBox';

import { number } from '@storybook/addon-knobs';

const storybookConfig = {
  title: 'Components/NotchedBox',
  component: NotchedBox,
  parameters: {
    componentSubtitle: 'This is a box with notched corners',
  },
};

export default storybookConfig;

export const NotchedExample = () => (
  <NotchedBox
    notchSize={
      number('Notch Size', 35, {
        range: true,
        min: 1,
        max: 100,
      }) + 'px'
    }
  />
);
