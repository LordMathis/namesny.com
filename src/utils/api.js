import fs from 'fs'
import data from './data.json'

export function getData (path = '') {
  if (path === '') {
    return data
  } else {
    const fileName = '../../content/' + path
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
