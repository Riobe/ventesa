import React from 'react';
import { render } from '@testing-library/react';
import DotGroup from './DotGroup';

it('should render successfully.', () => {
  const className = 'test-class';

  const dot = render(<DotGroup />);

  expect(dot).toBeTruthy();
});
