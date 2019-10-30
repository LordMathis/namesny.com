import express from 'express'
import helmet from 'helmet'
import expressStaticGzip from 'express-static-gzip'
import config from '../config/config.json'
import path from 'path'
import jsonfile from 'jsonfile'
import { ServerRenderer } from './utils/serverRender'
import { Scanner } from './utils/scanner'

const port = process.env.PORT || 3000
const app = express()

const scanner = new Scanner()
scanner.scan()

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", `*.${config.baseUrl}`],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", `*.${config.baseUrl}`],
    styleSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'maxcdn.bootstrapcdn.com'],
    fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'maxcdn.bootstrapcdn.com'],
    imgSrc: ['*'],
    workerSrc: false,
    blockAllMixedContent: true
  }
}))

app.use('/static', expressStaticGzip('public/static'))

app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Not Found !!!')
})

let head = jsonfile.readFileSync(path.join(process.cwd(), 'config/head.json'))
if (head == null) {
  head = {
    "scripts": []
  }
}

const serverRenderer = new ServerRenderer(head)
app.get('*', serverRenderer.render.bind(serverRenderer))

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('[Server] Listening on port %s', port)
  }
})
