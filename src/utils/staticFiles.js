const staticFiles = require('express').Router();
const path = require('path');
import manifest from '../../public/static/manifest.json'

staticFiles.get('/*.js', (req, res) => {
  const filename = req.url.split("/").pop();
  if (req.acceptsEncodings('gzip')) {
    res.set({
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=31536000'
    });
    res.sendFile(path.join(process.cwd(), '/public/', manifest[`${filename}.gz`]));
  } else {
    res.set('Cache-Control', 'max-age=31536000');
    res.sendFile(path.join(process.cwd(), '/public/', manifest['bundle.js']));
  }
});

staticFiles.get('/*.css', (req, res) => {
  const filename = req.url.split("/").pop();
  if (req.acceptsEncodings('gzip')) {
    res.set({
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/css',
      'Cache-Control': 'max-age=31536000'
    });
    res.sendFile(path.join(process.cwd(), '/public/',  manifest[`${filename}.gz`]));
  } else {
    res.set('Cache-Control', 'max-age=31536000');
    res.sendFile(path.join(process.cwd(), '/public/', manifest['bundle.css']));
  }
});

staticFiles.get('*.jpg', (req, res) => {
  res.set('Cache-Control', 'max-age=31536000');
  res.sendFile(path.join(process.cwd(), '/public/static', req.url))
});

module.exports = staticFiles;
