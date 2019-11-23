import fs from 'fs'
import path from 'path'
import fm from 'front-matter'
import moment from 'moment'
import jsonfile from 'jsonfile'
import zlib from 'zlib'

export class Scanner {
  constructor (config) {
    this.config = config
    this.initData()
  }

  initData () {
    this.data = {
      posts: [],
      other: {}
    }
  }

  addFile (filepath) {
    if (path.extname(filepath) === '.jpg' || path.extname(filepath) === '.png' || path.extname(filepath) === '.gif') {
      this.copyImage(filepath)
        .then((file) => this.gzipImage(file))
    } else {
      this.readfile(filepath)
        .then((data) => this.processFile(data[0], data[1]))
        .then(() => this.writeData())
    }
  }

  updateFile (filepath) {
    this.deleteFile(filepath)
    this.addFile(filepath)
  }

  deleteFile (filepath) {
    this.data.posts = this.data.posts.filter((post) =>
      post.filename !== filepath
    )
  }

  readfile (filePath) {
    const relPath = path.relative(path.join(process.cwd(), 'content'), filePath)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve([relPath, data])
        }
      })
    })
  }

  copyImage (filePath) {
    return new Promise((resolve, reject) => {
      const relPath = path.relative(path.join(process.cwd(), 'content'), filePath)
      const outputPath = path.join(process.cwd(), 'public/static', relPath)
      fs.copyFile(filePath, outputPath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(relPath)
        }
      })
    })
  }

  gzipImage (filename) {
    return new Promise((resolve, reject) => {
      const inputPath = path.join(process.cwd(), 'public/static', filename)
      const outputPath = path.join(process.cwd(), 'public/static', `${filename}.gz`)

      const fileContents = fs.createReadStream(inputPath)
      const writeStream = fs.createWriteStream(outputPath)
      const zip = zlib.createGzip()
      fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  processFile (file, data) {
    const filePath = path.join(process.cwd(), 'content', file)
    const metadata = this.fileMetadata(filePath)

    if (this.config['non-content-files'].indexOf(file) === -1) {
      const frontMatter = fm(data)

      if (frontMatter.attributes.draft) {
        return Promise.resolve()
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

    return Promise.resolve()
  }

  writeData () {
    return new Promise((resolve, reject) => {
      jsonfile.writeFile(path.join(process.cwd(), 'data.json'), this.data, (err) => {
        if (err) {
          reject(err)
        } else {
          this.initData()
          resolve()
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

  // scan () {
  //   this.readdir(path.join(process.cwd(), 'content'))
  //     .then(
  //       (files) => {
  //         const filtered = files.filter(
  //           (file) => (
  //             fs.statSync(path.join(process.cwd(), 'content', file)).isFile()
  //           )
  //         )

  //         const images = filtered.filter(
  //           (file) => (
  //             path.extname(file) == '.jpg' || path.extname(file) == '.png' || path.extname(file) == '.gif'
  //           )
  //         )
  //         Promise.all(images.map(this.copyImage))
  //           .then((files) => files.map(this.gzipImage))

  //         const posts = filtered.filter(
  //           (file) => (
  //             path.extname(file) == '.md'
  //           )
  //         )
                 
  //         return Promise.all(posts.map(this.readfile))
  //       }
  //     ).then(
  //       (files) => {          
  //         files.forEach(
  //           (item) => { this.processFile(item[0], item[1]) }
  //         )
  //         return this.writeData()
  //       }
  //     ).then(
  //       console.log('[Scanner] Scan complete')
  //     ).catch(
  //       (err) => console.log(err)
  //     )
  // }
}
