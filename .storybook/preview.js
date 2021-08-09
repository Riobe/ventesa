import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from '@chakra-ui/core';

import { themes } from '@storybook/theming';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import customTheme from '../src/web/theme';
import { bgColor } from '../src/web/theme/helpers';

const CanvasElement = styled.main`
  background-color: ${bgColor('primary')};
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

export const decorators = [
  Story => {
    return (
      <ThemeProvider theme={customTheme}>
        <Canvas>
          <Story />
        </Canvas>
      </ThemeProvider>
    );
  },
];

function CustomDocsContainer({ context, children }) {
  return (
    <DocsContainer context={context}>
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </DocsContainer>
  );
}

export const parameters = {
  docs: {
    theme: themes.dark,
    container: CustomDocsContainer,
    page: DocsPage,
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
};
