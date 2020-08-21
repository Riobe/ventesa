import React, { useState } from 'react';
import { boolean } from '@storybook/addon-knobs';

import PinnableButton from './PinnableButton';
import Panel from '../Panel';

export default {
  title: 'Components/PinnableButton',
  component: PinnableButton,
  parameters: {
    componentSubtitle: 'A pinnable button used to navigate recent routes.',
  },
};

// Stories
export const Example = () => (
  <Panel style={{ padding: '10px' }}>
    <PinnableButton pinned={boolean('Pinned?', false)}>
      Boar-Tusk Crocodile
    </PinnableButton>
  </Panel>
);

export const Pinned = () => (
  <Panel style={{ padding: '10px' }}>
    <PinnableButton pinned={true}>Boar-Tusk Crocodile</PinnableButton>
  </Panel>
);

export const Controlled = () => {
  const [pinned, setPinned] = useState(false);

  return (
    <Panel style={{ padding: '10px' }}>
      <PinnableButton
        pinned={pinned}
        onPinToggle={newPinned => setPinned(newPinned)}
      >
        Boar-Tusk Crocodile
      </PinnableButton>
    </Panel>
  );
};
