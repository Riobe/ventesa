import React, { useState } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PinnableButton from './PinnableButton';
import Panel from '../Panel';

const storybookConfig = {
  title: 'Components/PinnableButton',
  component: PinnableButton,
  parameters: {
    componentSubtitle: 'A pinnable button used to navigate recent routes.',
  },
};

export default storybookConfig;

// Stories
export const Example = () => (
  <Panel style={{ padding: '10px' }}>
    <PinnableButton
      pinned={boolean('Pinned?', false)}
      active={boolean('Active?', false)}
      onPinToggle={action('onPinToggle')}
      onRouteClicked={action('onRouteClicked')}
      onClose={action('onClose')}
    >
      Boar-Tusk Crocodile
    </PinnableButton>
  </Panel>
);

export const Pinned = () => (
  <Panel style={{ padding: '10px' }}>
    <PinnableButton
      pinned={true}
      onPinToggle={action('onPinToggle')}
      onRouteClicked={action('onRouteClicked')}
      onClose={action('onClose')}
    >
      Boar-Tusk Crocodile
    </PinnableButton>
  </Panel>
);

export const Controlled = () => {
  const [pinned, setPinned] = useState(false);

  return (
    <Panel style={{ padding: '10px' }}>
      <PinnableButton
        pinned={pinned}
        onPinToggle={newPinned => setPinned(newPinned)}
        onRouteClicked={action('onRouteClicked')}
        onClose={action('onClose')}
      >
        Boar-Tusk Crocodile
      </PinnableButton>
    </Panel>
  );
};
