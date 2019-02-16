import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './components'

hydrate(
  <Router>
    <App data={window.__INITIAL_DATA__}/>
  </Router>,
  document.getElementById('root')
)
