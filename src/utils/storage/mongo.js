import mongoose, { Schema } from 'mongoose'

export class MongoStorage {
  constructor () {
    const PostSchema = new Schema({
      filename: String,
      published: String,
      title: String,
      summary: String,
      link: String,
      body: String
    })
    PostSchema.index({ filename: 1 })
    this.Post = mongoose.model('Post', PostSchema)

    const OtherSchema = new Schema({
      filename: String,
      body: String
    })
    OtherSchema.index({ filename: 1 })
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
    //
  }

  getData (reqPath) {
    if (reqPath === '') {
      const data = {
        posts: [],
        other: {}
      }

      return Promise.all([
        this._getOther('about'),
        this._getAllPosts()
      ]).then((res) => {
        data.other.about = res[0].body
        data.posts = res[1]
        return data
      })
    } else if (reqPath === 'resume') {
      return Promise.resolve({})
    } else {

    }
  }

  _getOther (filename) {
    return new Promise((resolve, reject) => {
      this.Other.findOne({ filename: filename }, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }

  _getAllPosts () {
    return new Promise((resolve, reject) => {
      this.Post.find({}, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }
}
