import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from '@chakra-ui/core';

import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

import customTheme from '../src/theme';
import exaltedBackgroundMap from '../src/images/exalted-bg-map.jpg';

const CanvasElement = styled.main`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: 10px;
`;

function Canvas({ children }) {
  const theme = useTheme();

  return (
    <CanvasElement className="Canvas" theme={theme}>
      {children}
    </CanvasElement>
  );
}

addDecorator(story => (
  <ThemeProvider theme={customTheme}>
    <Canvas>{story()}</Canvas>
  </ThemeProvider>
));

addParameters({
  docs: {
    theme: themes.dark,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Docs',
        [
          'Welcome',
          'Getting Started',
          'Adding a Component',
          'Linting',
          'Testing',
          'Storybook',
        ],
        'Components',
      ],
      locales: 'en-US',
    },
  },
});
