import express from 'express'
import { serverRender } from './utils/serverRender'
import { Scanner } from './utils/scanner'

const port = process.env.PORT || 3000
const app = express()

const scanner = new Scanner()
scanner.scan()

app.use('/static', express.static('public/static'))

app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Not Found !!!')
})

app.get('*', serverRender)

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('[Server] Listening on port %s', port)
  }
})
