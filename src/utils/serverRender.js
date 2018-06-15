//import 'babel-polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { App } from '../components/App'

function serverRender(req, res) {
  let markup = '';
  let status = 200;

  const context = {}
  markup = renderToString(
    <Router location={req.url} context={context}>
      <App />
    </Router>,
  );

  return res.status(status).send(renderFullPage(markup));
}

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Matúš Námešný</title>
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:700&amp;subset=latin-ext" rel="stylesheet"> 
          <!-- Font Awesome -->
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

module.exports = serverRender;
