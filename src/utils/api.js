import fs from 'fs'
import jsonfile from 'jsonfile'
import path from 'path'
import config from '../../config/config.json'

export function getData (reqPath = '') {
  if (reqPath === '') {
    return readData(config.dataPath)
  } else {
    const fileName = path.join(process.cwd(), config.contentPath, reqPath + '.md')
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

function readData (dataPath) {
  return new Promise(function (resolve, reject) {
    jsonfile.readFile(dataPath, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
