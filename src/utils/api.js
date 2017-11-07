const data = require('./data.json');

module.exports = function(app) {
  app.get('/api/blog', (req, res) => {
    res.json(data.posts);
  });

  app.get('api/post/:postname', (req, res) => {
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
  })
}

function (postname) {
  data.posts
}
