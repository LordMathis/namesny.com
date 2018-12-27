//import 'babel-polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { App } from '../components/App'
import manifest from '../../public/static/manifest.json'
import routes from './routes'

function serverRender(req, res) {

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}


  let markup = '';
  let status = 200;

  const context = {}
  markup = renderToString(
    <Router location={req.url} context={context}>
      <App />
    </Router>,
  );

  return res.status(status).send(renderFullPage(markup, manifest));
}

function renderFullPage(html, manifest) {
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
          ${process.env.NODE_ENV === 'production' ? `<link href=${manifest['bundle.css']} rel="stylesheet">` : ''}
      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script src="${manifest['bundle.js']}" async></script>
      </body>
    </html>
    `
}

module.exports = serverRender;
