import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import theme from '../../theme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should render successfully.', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const textLinks = [
      'Characters',
      'Charms',
      'Qualities',
      'Equipment',
      'Combat Mode',
    ];

    textLinks.forEach(textLink => {
      const link = getByText(textLink);

      expect(link).toBeInTheDocument();
    });
  });

  it('should add the active class to an active link', async () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initalEntries={['/characters']}>
          <Sidebar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const links = getAllByRole('link');

    const characterLinks = links.filter(link =>
      link.innerText.includes('Characters'),
    );

    expect(characterLinks).toHaveLength(1);
    const characterLink = characterLinks[0];
    expect(characterLink).toHaveClass('active');
  });
});
