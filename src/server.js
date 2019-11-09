import express from 'express'
import helmet from 'helmet'
import expressStaticGzip from 'express-static-gzip'
import path from 'path'
import morgan from 'morgan'
import chokidar from 'chokidar'
import jsonfile from 'jsonfile'
import { ServerRenderer } from './utils/serverRender'
import { Scanner } from './utils/scanner'

const port = process.env.PORT || 3000
const app = express()
app.set('trust proxy', true)

let config = jsonfile.readFileSync(path.join(process.cwd(), 'config/config.json'))
if (config == null) {
  throw new Error('Config file not found!')
}

const scanner = new Scanner(config)

const watcher = chokidar.watch(path.join(process.cwd(), 'content'), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('ready', () => {
    scanner.scan()
  })
  .on('add', path => {
    console.log(`[Watcher] File ${path} has been added`)
    scanner.scan()
  })
  .on('change', path => {
    console.log(`[Watcher] File ${path} has been changed`)
    scanner.scan()
  })
  .on('unlink', path => {
    console.log(`[Watcher] File ${path} has been removed`)
    scanner.scan()
  })

app.use(morgan('common'))

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

const serverRenderer = new ServerRenderer(head, config)
app.get('*', serverRenderer.render.bind(serverRenderer))

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('[Server] Listening on port %s', port)
  }
})
