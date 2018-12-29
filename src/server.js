import express from 'express'
import fs from 'fs'
import {serverRender} from './utils/serverRender'

const port = process.env.PORT || 3000;
const app = express()

// const sass = require('node-sass');
//
// require('css-modules-require-hook')({
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
//   extensions: ['.scss', '.css'],
//   preprocessCss: (data, filename) => sass.renderSync({
//       data,
//       file: filename,
//   }).css
// });

// const filename = './src/utils/data.json';
// const dataStub = {"posts": [], "other": []};
// fs.writeFileSync(filename, JSON.stringify(dataStub));

// require('./utils/scanner')();

app.get("*", serverRender);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("[Server] Listening on port %s", port);
  }
})
