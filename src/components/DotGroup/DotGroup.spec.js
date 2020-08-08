import React from 'react';
import { render } from '@testing-library/react';
import DotGroup from './DotGroup';

describe('DotGroup', () => {
  it('should render successfully.', () => {
    const dotGroup = render(<DotGroup id="tested" />);

    expect(dotGroup).toBeTruthy();
  });

  it('should have 5 dots by default.', () => {
    const { getAllByRole } = render(<DotGroup id="tested" />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(5);
  });

  it('should render an zero dot if told to.', () => {
    const { getAllByRole } = render(<DotGroup id="tested" zeroDot={true} />);

    const dots = getAllByRole('radio');

    expect(dots.length).toBe(6);
  });
});
