import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Portfolio, Resume, NotFoundPage } from '.';
import { BlogContainer } from '../containers';

export const App = () => (
  <div>
    <Route component={Home} />
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/blog" component={BlogContainer} />
      <Route exact path="/portfolio" component={Portfolio} />
      <Route exact path="/resume" component={Resume} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
