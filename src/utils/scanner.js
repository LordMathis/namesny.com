import fs from 'fs'
import path from 'path'
import fm from 'front-matter'
import moment from 'moment'
import zlib from 'zlib'
import chokidar from 'chokidar'

export class Scanner {
  constructor (config, dataHolder) {
    this.config = config
    this.dataHolder = dataHolder
  }

  watch () {
    const watcher = chokidar.watch(this.config.contentPath, {
      ignored: /(^|[/\\])\../, // ignore dotfiles
      persistent: true
    })

    watcher
      .on('add', filepath => {
        console.log(`[Scanner] File ${filepath} has been added`)
        this.addFile(filepath)
      })
      .on('change', filepath => {
        console.log(`[Scanner] File ${filepath} has been changed`)
        this.addFile(filepath)
      })
      .on('unlink', filepath => {
        console.log(`[Scanner] File ${filepath} has been removed`)
        this.deleteFile(filepath)
      })
  }

  addFile (filepath) {
    if (path.extname(filepath) === '.jpg' || path.extname(filepath) === '.png' || path.extname(filepath) === '.gif') {
      this.copyImage(filepath)
        .then((file) => this.gzipImage(file))
    } else {
      this.readfile(filepath)
        .then((data) => this.processFile(data[0], data[1]))
    }
  }

  deleteFile (filepath) {
    this.dataHolder.deleteFile(filepath)
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

    if (this.config.specialFiles.indexOf(file) === -1) {
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
        link: '/post/' + metadata.filename,
        body: data
      }

      this.dataHolder.addPost(post)
    } else {
      this.dataHolder.addOther(metadata.filename, data)
    }

    return Promise.resolve()
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
}
