import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from '@chakra-ui/core';

import { themes } from '@storybook/theming';

import customTheme from '../src/theme';
import { bgColor } from '../src/theme/helpers';

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
    debugger;

    return (
      <ThemeProvider theme={customTheme}>
        <Canvas>
          <Story />
        </Canvas>
      </ThemeProvider>
    );
  },
];

export const parameters = {
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
};
