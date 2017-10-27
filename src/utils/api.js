module.exports = function(app) {
  app.get('/api/blog', ((req, res) => {
    res.json({
      "blog": "Blog hello"
    });
  }));
}
