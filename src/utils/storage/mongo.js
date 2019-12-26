import mongoose from 'mongoose'

export class MongoStorage {
  constructor () {
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

  addPost (post) {

  }

  addOther (filename, data) {

  }

  deleteFile (filepath) {

  }

  getData (reqPath) {

  }
}
