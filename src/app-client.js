import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './components';

const AppClient = () => (
  <Router>
    <App data={window.__INITIAL_DATA__}/>
  </Router>
)

window.onload = () => {
  hydrate(
    <AppClient />,
    document.getElementById('root')
  );
};
