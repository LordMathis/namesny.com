
export class DataHolder {
  constructor (storage) {
    this.storage = storage
  }

  addPost (post) {
    this.storage.addPost(post)
  }

  addOther (filename, data) {
    this.storage.addOther(filename, data)
  }

  deleteFile (filepath) {
    this.storage.deleteFile(filepath)
  }

  getData (reqPath) {
    return this.storage.getData(reqPath)
  }
}
