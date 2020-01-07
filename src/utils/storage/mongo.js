import mongoose, { Schema } from 'mongoose'

export class MongoStorage {
  constructor (config) {
    this.config = config

    const PostSchema = new Schema({
      filename: String,
      published: String,
      title: String,
      summary: String,
      link: String,
      body: String
    })
    PostSchema.index({
      body: 'text',
      title: 'text'
    })
    PostSchema.index({
      filename: 'hashed'
    })
    this.Post = mongoose.model('Post', PostSchema)

    const OtherSchema = new Schema({
      filename: String,
      body: String
    })
    OtherSchema.index({ filename: 'hashed' })
    this.Other = mongoose.model('Other', OtherSchema)

    this.options = {
      upsert: true,
      useFindAndModify: false
    }
  }

  addPost (post) {
    const query = {
      filename: post.filename
    }
    this.Post.findOneAndUpdate(query, post, this.options, (err) => {
      if (err) throw err
    })
  }

  addOther (filename, data) {
    const query = {
      filename: filename
    }
    const update = {
      filename: filename,
      body: data
    }
    this.Other.findOneAndUpdate(query, update, this.options, (err) => {
      if (err) throw err
    })
  }

  deleteFile (filepath) {
    const filename = filepath.split('/').pop()
    const basename = filename.split('.')[0]
    if (this.config['non-content-files'].indexOf(filename) === -1) {
      this.Post.findOneAndDelete({ filename: basename }, (err) => {
        if (err) throw err
      })
    } else {
      this.Other.findOneAndDelete({ filename: basename }, (err) => {
        if (err) throw err
      })
    }
  }

  getData (reqPath) {
    if (reqPath === '/') {
      const data = {
        posts: [],
        other: {}
      }

      return Promise.all([
        this._getOther('about'),
        this._getAllPosts()
      ]).then((res) => {
        data.other.about = res[0].data
        data.posts = res[1]
        return data
      })
    } else if (reqPath.startsWith('/post')) {
      return this._getPost(reqPath.split('/').pop())
    } else {
      return this._getOther(reqPath.split('/').pop())
    }
  }

  _getOther (filename) {
    return new Promise((resolve, reject) => {
      this.Other.findOne({ filename: filename }, (err, data) => {
        err ? reject(err) : resolve({
          type: filename,
          data: data.body
        })
      })
    })
  }

  _getAllPosts () {
    return new Promise((resolve, reject) => {
      this.Post.find({}, { body: false }, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  }

  _getPost (filename) {
    return new Promise((resolve, reject) => {
      this.Post.findOne({ filename: filename }, (err, data) => {
        err ? reject(err) : resolve({
          type: 'content',
          data: data.body
        })
      })
    })
  }
}
