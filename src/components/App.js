import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFoundPage } from '.';
import { BlogContainer, PostContainer } from '../containers';

export const App = () => (
  <div>
    <Route component={Home} />
    <Switch>
      <Route exact path="/blog" component={BlogContainer} />
      <Route path="/blog/post/:postname" component={PostContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
