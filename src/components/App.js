import { NotFoundWrapper } from '.'
import React, { Component } from 'react'
import routes from '../utils/routes'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
         {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <C {...props} {...rest} />
              )}
            />
          ))}
          <Route render={(props) => <NotFoundWrapper {...props} />} />
        </Switch>
      </div>
    )
  }
}

// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import { NotFoundWrapper } from '.';
// import { MainContainer, PostContainer } from '../containers';
//
// export const App = () => (
//   <div>
//     <Switch>
//       <Route exact path="/" component={MainContainer} />
//       <Route path="/post/:postname" component={PostContainer} />
//       <Route component={NotFoundWrapper} />
//     </Switch>
//   </div>
// );
//
// export default App;
