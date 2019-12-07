import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { App } from '../components'
import routes from './routes'
import serialize from 'serialize-javascript'
import manifest from '../../public/static/manifest.json'

export class ServerRenderer {
  constructor (head, config, dataGetter) {
    this.head = head
    this.config = config
    this.dataGetter = dataGetter
  }

  render (req, res, next) {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || false
    const head = this.head
    const config = this.config

    if (!activeRoute) {
      const context = [{}, config]
      const markup = renderToString(
        <Router location={req.url} context={{ context }}>
          <App/>
        </Router>
      )
      res.status(404).send(renderFullPage(markup, head, {}, config))
    } else {
      const promise = this.dataGetter.getData(req.path.split('/').pop())

      promise.then((data) => {
        const context = [data, config]
        const markup = renderToString(
          <Router location={req.url} context={{ context }}>
            <App/>
          </Router>
        )

        res.status(200).send(renderFullPage(markup, head, data, config))
      }).catch(next)
    }
  }
}

function renderFullPage (html, head, data, config) {
  const initialData = [data, config]
  return `
    <!DOCTYPE html>  
    <html lang="en">
      <head>
        <title>${config.title}</title>
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:700&amp;subset=latin-ext" rel="stylesheet" rel="preload">
          <!-- Font Awesome -->
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" rel="preload" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
          <!-- Stylesheet -->
          <link href=${manifest['bundle.css']} rel="stylesheet" rel="preload">
          <!-- Initial Data -->
          <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
          ${head.scripts.join('\n')}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src=${manifest['bundle.js']} async></script>
      </body>
    </html>
    `
}
