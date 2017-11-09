const data = require('./data.json');
const api = require('express').Router();

api.get('/blog', (req, res) => {
  res.json(data.posts);
});

api.get('/post/:postname', (req, res) => {
  const post = data.posts.find((el) => {
    el.filename === req.params.postname
  });

  if (post) {
    res.json(post);
  } else {
    res.json({
      error: 404
    });
  }
});


module.exports = api;
