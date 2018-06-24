const staticFiles = require('express').Router();
const path = require('path');

staticFiles.get('/bundle.js', (req, res) => {
  if (req.acceptsEncodings('gzip')) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.js.gz'));
  } else {
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.js'));
  }
});

staticFiles.get('/bundle.css', (req, res) => {
  if (req.acceptsEncodings('gzip')) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.css.gz'));
  } else {
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.css'));
  }
});

staticFiles.get('*.jpg', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/static', req.url))
});

module.exports = staticFiles;
