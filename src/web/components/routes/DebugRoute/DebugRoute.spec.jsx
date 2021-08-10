import React from 'react';
import { render } from '@testing-library/react';

import DebugRoute from './DebugRoute';

describe('DebugRoute', () => {
  it('should render successfully with a header 1 title.', async () => {
    const { getByRole } = render(<DebugRoute />);

    const title = getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
  });
});
