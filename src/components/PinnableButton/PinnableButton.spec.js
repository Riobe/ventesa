import React from 'react';
import { render } from '@testing-library/react';
import PinnableButton from './PinnableButton';

describe('PinnableButton', () => {
  it('should render successfully.', async () => {
    const { getAllByRole } = render(<PinnableButton />);

    const buttons = getAllByRole('button');

    expect(buttons).toHaveLength(2);

    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button).not.toBeEmpty();
    });

    expect(buttons[0]).toHaveClass('PinnableButtonPin');
    expect(buttons[1]).toHaveClass('PinnableButtonChararacter');
  });
});
