import express from 'express'
import fs from 'fs'
import {serverRender} from './utils/serverRender'
import csshook from 'css-modules-require-hook/preset'
const port = process.env.PORT || 3000;
const app = express()

// const filename = './src/utils/data.json';
// const dataStub = {"posts": [], "other": []};
// fs.writeFileSync(filename, JSON.stringify(dataStub));

// require('./utils/scanner')();

app.use('/static', express.static('public/static'))

app.get("*", serverRender);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("[Server] Listening on port %s", port);
  }
})
