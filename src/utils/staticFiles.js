const staticFiles = require('express').Router();
const path = require('path');

staticFiles.get('/bundle.js', (req, res) => {
  if (req.acceptsEncodings('gzip')) {
    res.set({
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=86400'
    });
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.js.gz'));
  } else {
    res.set('Cache-Control', 'max-age=86400');
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.js'));
  }
});

staticFiles.get('/bundle.css', (req, res) => {
  if (req.acceptsEncodings('gzip')) {
    res.set({
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/css',
      'Cache-Control': 'max-age=86400'
    });
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.css.gz'));
  } else {
    res.set('Cache-Control', 'max-age=86400');
    res.sendFile(path.join(process.cwd(), '/public/static/bundle.css'));
  }
});

staticFiles.get('*.jpg', (req, res) => {
  res.set('Cache-Control', 'max-age=31536000');
  res.sendFile(path.join(process.cwd(), '/public/static', req.url))
});

module.exports = staticFiles;
