import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Home, About, Blog, Portfolio, Resume} from './components';
import './static/stylesheets/main.scss';

ReactDom.render(
  <HashRouter>
    <div className="container">
      <Route component={Home}/>
      <Route exact path='/about' component={About} />
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/portfolio' component={Portfolio} />
      <Route exact path='/resume' component={Resume} />
    </div>
  </HashRouter>,
  document.getElementById('app')
);
