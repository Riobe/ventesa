import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from './theme';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Router>
  );
}

export default App;
