import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './components';

const AppClient = () => (
  <Router>
    <App />
  </Router>
)

hydrate(
  <AppClient />,
  document.getElementById('root')
);
