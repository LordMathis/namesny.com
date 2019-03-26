import fs from 'fs'
import path from 'path'
import config from '../../config.json'
import fm from 'front-matter'
import moment from 'moment'
import jsonfile from 'jsonfile'

export class Scanner {
  constructor () {
    this.data = {}
  }

  readdir (dirname) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, function (err, filenames) {
        if (err) {
          reject(err)
        } else {
          resolve(filenames)
        }
      })
    })
  }

  readfile (filename) {
    const filePath = path.join(process.cwd(), config.contentPath, filename)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve([filename, data])
        }
      })
    })
  }

  processFile (file, data) {
    const filePath = path.join(process.cwd(), config.contentPath, file)
    const metadata = this.fileMetadata(filePath)

    if (config.files.indexOf(file) === -1) {
      const frontMatter = fm(data)

      if (frontMatter.attributes.draft) {
        return
      }

      let published
      if (frontMatter.attributes.date) {
        published = moment(frontMatter.attributes.date)
      } else {
        published = moment()
      }

      const post = {
        published: published.format('MMMM DD, YYYY'),
        filename: metadata.filename,
        title: frontMatter.attributes.title,
        link: '/post/' + metadata.filename
      }

      this.data.posts.push(post)
    } else {
      this.data.other[metadata.filename] = data
    }
  }

  init () {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(config.dataPath, (err, data) => {
        if (err) {
          reject(err)
        } else {
          this.data = data
          resolve(data)
        }
      })
    })
  }

  writeData (callback) {
    return new Promise((resolve, reject) => {
      jsonfile.writeFile(config.dataPath, this.data, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(this.data)
        }
      })
    })
  }

  fileMetadata (filepath) {
    const paths = filepath.split('/')
    const basename = path.basename(filepath)

    const metadata = {
      basename,
      filename: basename.substr(0, basename.lastIndexOf('.')),
      parrent: paths[paths.length - 2],
      dirname: path.dirname(filepath)
    }

    return metadata
  }

  scan () {
    this.init()
      .then(
        () => this.readdir(config.contentPath)
      ).then(
        (files) => { return Promise.all(files.map(this.readfile)) }
      ).then(
        (files) => {
          files.forEach(
            (item) => { this.processFile(item[0], item[1]) }
          )
          return this.writeData()
        }
      ).then(
        console.log('[Scanner] Scan complete')
      ).catch(
        (err) => console.log(err)
      )
  }
}
