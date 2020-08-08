import React from 'react';
import { render } from '@testing-library/react';
import DotGroup from './DotGroup';

describe('DotGroup', () => {
  it('should render successfully.', () => {
    const { getByRole } = render(<DotGroup />);

    const dotGroup = getByRole('radiogroup');

    expect(dotGroup).toBeInTheDocument();
    expect(dotGroup).not.toBeEmpty();
    expect(dotGroup).toHaveClass('DotGroup');
  });

  it('should have 5 unchecked dots by default.', () => {
    const { getAllByRole } = render(<DotGroup />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(5);
    dots.forEach(dot => {
      expect(dot).not.toBeChecked();
    });
  });

  it('should render an zero dot if told to.', () => {
    const { getAllByRole } = render(<DotGroup zeroDot={true} />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(6);
    expect(dots[0]).toHaveStyle(`
      background-color: transparent;
      border: 0.2rem dashed black;
    `);
  });

  it('should render the amount of dots given as a maximum.', () => {
    const { getAllByRole } = render(<DotGroup maxDots={3} />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(3);
  });

  it('should render correctly with a different max and zero both set.', () => {
    const { getAllByRole } = render(<DotGroup maxDots={3} zeroDot={true} />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(4);
  });

  it('should render checked dots if given a value in between zero and max', () => {
    const { getAllByRole } = render(<DotGroup value={1} maxDots={2} />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(2);
    expect(dots[0]).toBeChecked();
    expect(dots[1]).not.toBeChecked();
  });
});
