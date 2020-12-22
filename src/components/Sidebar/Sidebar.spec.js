import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import theme from '../../theme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should render successfully.', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Sidebar />
      </ThemeProvider>,
    );

    const textLinks = [
      'Home',
      'Narrative Mode',
      'Combat Mode',
      'NPCS',
      'Charms',
      'Players',
    ];

    textLinks.forEach(textLink => {
      const link = getByText(textLink);

      expect(link).toBeInTheDocument();
    });
  });
});
