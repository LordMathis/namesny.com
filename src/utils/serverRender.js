// import 'babel-polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { App } from '../components'
import routes from './routes'
import serialize from 'serialize-javascript'

export function serverRender (req, res, next) {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.getData
    ? activeRoute.getData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    console.log(data)

    const markup = renderToString(
      <Router location={req.url} context={{}}>
        <App data={data}/>
      </Router>
    )

    res.status(200).send(renderFullPage(markup, data))
  }).catch(next)
}

function renderFullPage (html, data) {
  return `
    <!DOCTYPE html>  
    <html>
      <head>
        <title>Matúš Námešný</title>
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:700&amp;subset=latin-ext" rel="stylesheet" rel="preload">
          <!-- Font Awesome -->
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" rel="preload" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
          <!-- Stylesheet -->
          <link href="static/bundle.css" rel="stylesheet" rel="preload">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="static/bundle.js" async></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </body>
    </html>
    `
}
