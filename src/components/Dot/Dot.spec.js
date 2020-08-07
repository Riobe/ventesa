import React from 'react';
import { render } from '@testing-library/react';
import Dot from './Dot';

it('should render successfully.', () => {
  const dot = render(<Dot />);

  expect(dot).toBeTruthy();
});
