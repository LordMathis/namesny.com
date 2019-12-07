import fs from 'fs'
import jsonfile from 'jsonfile'
import path from 'path'

export class DataGetter {
  constructor (config, dataHolder) {
    this.config = config
    this.dataHolder = dataHolder
  }

  getData (reqPath) {
    if (this.config.storage === 'file') {
      return this.getDataFromFile(reqPath)
    }
  }

  getDataFromFile (reqPath) {
    if (reqPath === '') {
      return Promise.resolve(this.dataHolder.data)
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
}
