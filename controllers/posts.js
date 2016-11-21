const Post = require('../models/post');

function postsIndex(req, res) {
  Post.find(req.query, (err, posts) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(posts);
  });
}

function postsCreate(req, res) {
  req.body.image = req.file;
  Post.create(req.body, (err, post) => {
    if (err) return res.status(400).json({ error: err });
    return res.json(post);
  });
}

function postsShow(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.status(500).json({ error: err });
    if (!post) return res.status(404).json({ error: 'Not Found!' });
    return res.json(post);
  });
}

function postsUpdate(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.status(500).json({ error: err });
    if (!post) return res.status(404).json({ error: 'Not Found!' });

    post.save((err, post) => {
      if (err) return res.status(400).json({ error: err });
      res.json(post);
    });
  });
}

function postsDelete(res, req) {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.status(500).json({ error: err });
    if (!post) return res.status(404).json({ error: 'Not Found!' });

    post.remove(err => {
      if (err) return res.status(404).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: postsIndex,
  create: postsCreate,
  show: postsShow,
  update: postsUpdate,
  delete: postsDelete
};
