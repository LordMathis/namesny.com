import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFoundPage } from '.';
import { MainContainer, PostContainer } from '../containers';

export const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainContainer} />
      <Route path="/post/:postname" component={PostContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
