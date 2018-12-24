import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './components';

const AppClient = () => (
  <Router>
    <App />
  </Router>
)

window.onload = () => {
  hydrate(
    <AppClient />,
    document.getElementById('root')
  );
};
