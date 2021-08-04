import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import theme from '../../theme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should render successfully.', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Router>
          <Sidebar />
        </Router>
        ,
      </ThemeProvider>,
    );

    const textLinks = [
      'Home',
      'Narrative Mode',
      'Combat Mode',
      'Charms',
      'Characters',
    ];

    textLinks.forEach(textLink => {
      const link = getByText(textLink);

      expect(link).toBeInTheDocument();
    });
  });
});
