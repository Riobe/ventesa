import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import PinnableButton from './PinnableButton';

import theme from '../../theme';

describe('PinnableButton', () => {
  const onPinToggle = jest.fn();
  const onRouteClicked = jest.fn();
  const DummyComponent = () => <div>Boar-Tusk Crocodile</div>;

  beforeEach(() => {
    onPinToggle.mockClear();
    onRouteClicked.mockClear();
  });

  it('should render successfully.', async () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={theme}>
        <PinnableButton
          onPinToggle={onPinToggle}
          onRouteClicked={onRouteClicked}
        >
          <DummyComponent />
        </PinnableButton>
      </ThemeProvider>,
    );

    const buttons = getAllByRole('button');

    expect(buttons).toHaveLength(3);

    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button).not.toBeEmpty();
    });

    expect(buttons[0]).toHaveClass('PinnableButtonPin');
    expect(buttons[1]).toHaveClass('PinnableButtonRoute');
    expect(buttons[2]).toHaveClass('PinnableButtonClose');
  });
});
