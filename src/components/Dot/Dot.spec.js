import React from 'react';
import { render } from '@testing-library/react';
import Dot from './Dot';

describe('Dot', () => {
  it('should render successfully.', () => {
    const { getByRole } = render(<Dot />);

    const dot = getByRole('radio');

    expect(dot).toBeInTheDocument();
    expect(dot).toBeEmpty();
    expect(dot).toHaveClass('Dot');
  });

  it('should render empty by default.', () => {
    const { getByRole } = render(<Dot />);

    const dot = getByRole('radio');

    expect(dot).toHaveStyle(`
      background-color: transparent;
    `);
    expect(dot).not.toBeChecked();
  });

  it('should render a solid background if checked.', () => {
    const { getByRole } = render(<Dot checked={true} />);

    const dot = getByRole('radio');

    expect(dot).toHaveStyle(`
      background-color: black;
    `);
    expect(dot).toBeChecked();
  });

  it('should render a solid background if checked.', () => {
    const { getByRole } = render(<Dot zero={true} />);

    const dot = getByRole('radio');

    expect(dot).toHaveStyle(`
      background-color: transparent;
      border: 0.2rem dashed black;
    `);
    expect(dot).not.toBeChecked();
  });
});
