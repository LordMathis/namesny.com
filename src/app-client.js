import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './components';
import './static/stylesheets/main.scss';

const AppClient = () => (
  <Router>
    <App />
  </Router>
)

window.onload = () => {
  render(
    <AppClient />,
    document.getElementById('app')
  );
};
