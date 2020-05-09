import express from 'express'
import helmet from 'helmet'
import expressStaticGzip from 'express-static-gzip'
import path from 'path'
import morgan from 'morgan'
import mongoose from 'mongoose'
import jsonfile from 'jsonfile'
import { ServerRenderer } from './utils/serverRender'
import { Scanner } from './utils/scanner'
import { FileStorage } from './utils/storage/file'
import { MongoStorage } from './utils/storage/mongo'
import { Api } from './utils/api'

const configPath = process.argv[2] || path.join(process.cwd(), 'config/config.json')

const app = express()
app.set('trust proxy', true)

const config = jsonfile.readFileSync(configPath)
if (config == null) {
  throw new Error('Config file not found!')
}
const port = config.port || 3000

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
  res.status(204).send('Not Found !!!')
})

let head = jsonfile.readFileSync(path.join(process.cwd(), 'config/head.json'))
if (head == null) {
  head = {
    scripts: []
  }
}

let storage
if (config.storage === 'file') {
  storage = new FileStorage(config)
} else if (config.storage === 'mongo') {
  storage = new MongoStorage(config)
}

if (config.storage === 'mongo') {
  const postApi = new Api(storage)
  app.get('/api/v1/posts', postApi.getPosts.bind(postApi))
}

const scanner = new Scanner(config, storage)

const serverRenderer = new ServerRenderer(head, config, storage)
app.get('*', serverRenderer.render.bind(serverRenderer))

if (config.storage === 'mongo') {
  mongoose.connect(config.mongourl, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', (error) => console.error(`[Server] Unable to connect to database\n${error}`))
  db.once('open', () => {
    console.log('[Server] Connected to database')
    startServer()
  })
} else {
  startServer()
}

function startServer () {
  scanner.watch()
  app.listen(port, function (error) {
    if (error) {
      console.error(`[Server] Unable to start server\n${error}`)
    } else {
      console.info(`[Server] Listening on port ${port}`)
    }
  })
}
