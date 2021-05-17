import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, defaultTheme, darkTheme } from './utils';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <App />
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
