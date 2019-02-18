import fs from 'fs'
import jsonfile from 'jsonfile'
import config from '../../config.json'

export function getData (reqPath = '') {
  if (reqPath === '') {
    return readData(config.dataPath)
  } else {
    const fileName = '../../renders/' + reqPath + '.html'
    return readFile(fileName)
  }
};

function readFile (fileName, type) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, (err, data) => {
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
