import { NotFoundWrapper } from '.'
import React, { Component } from 'react'
import routes from '../utils/routes'
import { Route, Switch } from 'react-router-dom'

export default class App extends Component {
  render () {
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
