import fs from 'fs'
import async from 'async'
import path from 'path'
import config from '../../config.json'
import fm from 'front-matter'
import moment from 'moment'
import jsonfile from 'jsonfile'

class Scanner {
  readdir (callback) {
    fs.readdir(config.contentPath, callback)
  }

  processAll (files, callback) {
    console.log('[Scanner] Discovered files: ' + files)
    async.each(files, this.processFile, (err) => {
      if (err) throw err
      callback()
    })
  }

  processFile (file, callback) {
    const filePath = path.join(process.cwd(), config.contentPath, file)
    const metadata = this.fileMetadata(filePath)

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err

      if (config.files.indexOf(file) === -1) {
        const frontMatter = fm(data)

        if (frontMatter.attributes.draft) {
          callback(null, null)
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
        this.data.push({
          [metadata.filename]: data
        })
      }
    })
  }

  init (callback) {
    jsonfile.readFile(config.dataPath, (err, data) => {
      if (err) throw err

      this.data = data
    }).bind(this)
  }

  writeData (callback) {
    jsonfile.writeFile(config.dataPath, this.data, callback)
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
    async.waterfall([
      this.init,
      this.readdir,
      this.processAll,
      this.writeData
    ], (err) => {
      if (err) throw err
    })
  }
}
