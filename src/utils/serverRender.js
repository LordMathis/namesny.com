//import 'babel-polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { App } from '../components'
import routes from './routes'

export function serverRender(req, res, next) {

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
  ? activeRoute.fetchInitialData(req.path)
  : Promise.resolve()

  promise.then((data) => {
    const markup = renderToString(
      <Router location={req.url} context={{}}>
        <App />
      </Router>,
    );

    res.status(200).send(renderFullPage(markup));

  }).catch(next)
}

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Matúš Námešný</title>
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:700&amp;subset=latin-ext" rel="stylesheet" rel="preload">
          <!-- Font Awesome -->
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" rel="preload" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
          <!-- Stylesheet -->
          <link href="bundle.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="bundle.js" async></script>
      </body>
    </html>
    `
}
