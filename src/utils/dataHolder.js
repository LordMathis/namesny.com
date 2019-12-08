import fs from 'fs'
import jsonfile from 'jsonfile'
import path from 'path'
import mongoose from 'mongoose'

export class DataHolder {
  constructor (config) {
    this.config = config

    if (this.config.storage === 'file') {
      this.data = {
        posts: [],
        other: {}
      }
    } else if (this.config.storage === 'mongo') {
      mongoose.connect(config.mongourl, { useNewUrlParser: true })
      this.db = mongoose.connection
      this.db.on('error', (error) => console.error(`[DataHolder] ${error}`))
      this.db.once('open', () => console.log('[DataHolder] Connected to database'))

      this.Post = mongoose.model('Post', {
        filename: String,
        published: String,
        title: String,
        summary: String,
        link: String,
        body: String
      })

      this.Other = mongoose.model('Other', {
        filename: String,
        body: String
      })
    }
  }

  getData (reqPath) {
    if (this.config.storage === 'file') {
      return this.getDataFromFile(reqPath)
    }
  }

  getDataFromFile (reqPath) {
    if (reqPath === '') {
      return Promise.resolve(this.data)
    } else if (reqPath === 'resume') {
      const fileName = path.join(process.cwd(), 'content', reqPath + '.md')
      return this.readFile(fileName, 'resume', 'utf8')
    } else {
      const fileName = path.join(process.cwd(), 'content', reqPath + '.md')
      return this.readFile(fileName, 'post', 'utf8')
    }
  }

  readFile (fileName, type, options) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileName, options, (err, data) => {
        err ? reject(err) : resolve({
          type: type,
          data: data
        })
      })
    })
  }

  readJson (dataPath) {
    return new Promise(function (resolve, reject) {
      jsonfile.readFile(dataPath, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  }

  addPost (post) {
    delete post.body
    this.data.posts.push(post)
  }

  addOther (filename, data) {
    this.data.other[filename] = data
  }

  deleteFile (filepath) {
    this.data.posts = this.data.posts.filter((post) =>
      post.filename !== filepath
    )
  }
}
