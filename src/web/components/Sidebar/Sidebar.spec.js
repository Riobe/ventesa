import React from 'react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
    const initialRoute = '/characters';
    const history = createMemoryHistory();
    history.push(initialRoute);
    const { getAllByRole } = render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Route
            component={props => {
              return <Sidebar {...props} />;
            }}
            path={initialRoute}
          />
        </ThemeProvider>
      </Router>,
    );

    const links = getAllByRole('link');

    links.forEach(link => {
      if (link.innerHTML.includes('Characters')) {
        expect(link).toHaveClass('active');
      } else {
        expect(link).not.toHaveClass('active');
      }
    });
  });
});
