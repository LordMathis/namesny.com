const data = require('./data.json');

module.exports = function(app) {
  app.get('/api/blog', ((req, res) => {
    res.json(data.posts);
  }));
}
