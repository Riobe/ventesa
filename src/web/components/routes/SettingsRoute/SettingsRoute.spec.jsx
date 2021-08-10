import React from 'react';
import { render } from '@testing-library/react';

import SettingsRoute from './SettingsRoute';

describe('SettingsRoute', () => {
  it('should render successfully with a header 1 title.', async () => {
    const { getByRole } = render(<SettingsRoute />);

    const title = getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Settings');
  });
});
