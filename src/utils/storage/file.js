import fs from 'fs'
import path from 'path'

export class FileStorage {

  constructor () {
    this.data = {
      posts: [],
      other: {}
    }
  }

  addPost (post) {
    delete post.body
    const postIndex = this._findWithAttr(this.data.posts, 'filename', post.filename)

    if (postIndex === -1) {
      this.data.posts.push(post)
    } else {
      this.data.posts[postIndex] = post
    }
  }

  addOther (filename, data) {
    this.data.other[filename] = data
  }

  deleteFile (filepath) {
    this.data.posts = this.data.posts.filter((post) =>
      post.filename !== filepath
    )
  }

  getData (reqPath) {
    return this._getDataFromFile(reqPath)
  }

  _getDataFromFile (reqPath) {
    if (reqPath === '') {
      return Promise.resolve(this.data)
    } else if (reqPath === 'resume') {
      const fileName = path.join(process.cwd(), 'content', reqPath + '.md')
      return this._readFile(fileName, 'resume', 'utf8')
    } else {
      const fileName = path.join(process.cwd(), 'content', reqPath + '.md')
      return this._readFile(fileName, 'post', 'utf8')
    }
  }

  _readFile (fileName, type, options) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileName, options, (err, data) => {
        err ? reject(err) : resolve({
          type: type,
          data: data
        })
      })
    })
  }

  _findWithAttr (array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i
      }
    }
    return -1
  }
}
