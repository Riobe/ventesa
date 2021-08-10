import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './web/serviceWorker';
import theme from './web/theme';

import Layout from './web/components/Layout';

import './index.css';
console.log('In Renderer');

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
