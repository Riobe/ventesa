import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import theme from './theme';

import Layout from './components/Layout';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
