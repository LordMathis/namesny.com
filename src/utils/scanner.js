import fs from 'fs'
import path from 'path'
import config from '../../config/config.json'
import fm from 'front-matter'
import moment from 'moment'
import jsonfile from 'jsonfile'
import zlib from 'zlib'

export class Scanner {
  constructor () {
    this.data = {
      'posts': [],
      'other': {}
    }
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

  copyImage (filename) {
    return new Promise((resolve, reject) => {
      const inputPath = path.join(process.cwd(), config.contentPath, filename)
      const outputPath = path.join(process.cwd(), 'public/static', filename)
      fs.copyFile(inputPath, outputPath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(filename)
        }
      })
    })
  }

  gzipImage (filename) {
    return new Promise((resolve, reject) => {
      const inputPath = path.join(process.cwd(), 'public/static', filename)
      const outputPath = path.join(process.cwd(), 'public/static', `${filename}.gz`)
  
      const fileContents = fs.createReadStream(inputPath);
      const writeStream = fs.createWriteStream(outputPath);
      const zip = zlib.createGzip();
      fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
        if (err) {
          reject(err)
        }
        else {
          resolve()
        }
      })
    })
  }

  processFile (file, data) {
    const filePath = path.join(process.cwd(), config.contentPath, file)
    const metadata = this.fileMetadata(filePath)

    if (config['non-content-files'].indexOf(file) === -1) {
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

      const summary = frontMatter.body.split('\n\n', 1)[0]

      const post = {
        published: published.format('MMMM DD, YYYY'),
        filename: metadata.filename,
        title: frontMatter.attributes.title,
        summary: summary,
        link: '/post/' + metadata.filename
      }

      this.data.posts.push(post)
    } else {
      this.data.other[metadata.filename] = data
    }
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
    this.readdir(config.contentPath)
      .then(
        (files) => {
          const filtered = files.filter(
            (file) => (
              fs.statSync(path.join(process.cwd(), config.contentPath, file)).isFile()
            )
          )

          const images = filtered.filter(
            (file) => (
              path.extname(file) == '.jpg' || path.extname(file) == '.png' || path.extname(file) == '.gif'
            )
          )
          Promise.all(images.map(this.copyImage))
            .then((files) => files.map(this.gzipImage))

          const posts = filtered.filter(
            (file) => (
              path.extname(file) == '.md'
            )
          )
                 
          return Promise.all(posts.map(this.readfile))
        }
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
