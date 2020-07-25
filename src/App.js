import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import theme from './lib/theme';
import { CharacterProvider } from './lib/CharacterContext';

import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CharacterProvider>
        <Layout />
      </CharacterProvider>
    </ThemeProvider>
  );
}

export default App;
