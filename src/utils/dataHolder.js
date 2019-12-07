export class DataHolder {
  constructor () {
    this.data = {
      posts: [],
      other: {}
    }
  }

  addPost (post) {
    this.data.posts.push(post)
  }

  addOther (filename, data) {
    this.data.other[filename] = data
  }

  deleteFile (filepath) {
    this.data.posts = this.dataHolder.data.posts.filter((post) =>
      post.filename !== filepath
    )
  }
}
