const data = require('./data.json');
const api = require('express').Router();
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

api.get('/blog', (req, res) => {
  res.json(data.posts);
});

api.get('/about', (req, res) => {
  const renderPath = path.join(process.cwd(), '/renders', 'about.html');
  fs.readFile(renderPath, 'utf8', (err, data) => {
    if (err) {
      res.json({
        error: 404
      });
    } else {
      res.json({
        body: data,
      });
    }
  });
});

api.get('/post/:postname', (req, res) => {
  const postname = req.params.postname;
  const post = data.posts.find((el) => {
    return el.filename === postname
  });

  const renderPath = path.join(process.cwd(), '/renders', postname + '.html');
  fs.readFile(renderPath, 'utf8', (err, data) => {
    if (err) {
      res.json({
        error: 404
      });
    } else {
      res.json({
        published: post.published,
        link: post.link,
        title: post.title,
        body: data,
      });
    }
  });
});


module.exports = api;
