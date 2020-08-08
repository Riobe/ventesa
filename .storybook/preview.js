import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from '@chakra-ui/core';
import customTheme from '../src/theme';
import exaltedBackgroundMap from '../src/images/exalted-bg-map.jpg';

const CanvasElement = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  background: url(${exaltedBackgroundMap});
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

addDecorator(withKnobs);

addParameters({
  options: {
    theme: themes.dark,
  },
});
