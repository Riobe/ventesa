import React from 'react';
import { render } from '@testing-library/react';
import DotGroup from './DotGroup';

describe('DotGroup', () => {
  it('should render successfully.', () => {
    const dotGroup = render(<DotGroup id="tested" />);

    expect(dotGroup).toBeTruthy();
  });

  it('should have 5 dots by default.', () => {
    const { getAllByTestId } = render(<DotGroup id="tested" />);

    const dots = getAllByTestId('dot');

    expect(dots.length).toBe(5);
  });
});
