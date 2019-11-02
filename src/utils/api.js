import fs from 'fs'
import jsonfile from 'jsonfile'
import path from 'path'

export function getData (reqPath = '') {
  if (reqPath === '') {
    return readJson(path.join(process.cwd(), 'data.json'))
  } else {
    const fileName = path.join(process.cwd(), 'content', reqPath + '.md')
    return readFile(fileName, 'utf8')
  }
};

function readFile (fileName, options) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, options, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

function readJson (dataPath) {
  return new Promise(function (resolve, reject) {
    jsonfile.readFile(dataPath, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}