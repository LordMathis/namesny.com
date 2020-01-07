export class Api {
  constructor (storage) {
    this.storage = storage
  }

  getPosts (req, res) {
    const limit = req.query.limit ? req.query.limit : 10
    const skip = req.query.skip ? req.query.skip : 0

    if (req.query.search) {
      this.storage.Post.find(
        { $text: { $search: req.query.search } },
        { body: false })
        .skip(skip)
        .limit(limit)
        .then(posts => res.send(posts))
    } else {
      this.storage.Post.find({}, { body: false })
        .skip(skip)
        .limit(limit)
        .then(posts => res.send(posts))
    }
  }
}
