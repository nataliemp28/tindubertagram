const User = require('../models/user');
const Post = require('../models/post');

//FOLLOWERS
function followers(req, res) {
  User.findById(req.user._id, (err) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });

    User.find(({ following: req.user._id }), (err, users) => {
      if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
      return res.status(200).json(users);
    });
  });
}

//FOLLOWING
function following(req, res) {
  User.findById(req.user._id, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    const followingIds = user.following;

    User.find({ _id: { $in: followingIds } })
      .populate('following')
      .exec((err, users) => {
        if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
        return res.status(200).json(users);
      });
  });
}

// PROFILE FEED
function posts(req, res) {
  User.findById(req.user._id, (err) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });

    Post.find({ user: req.user._id })
      .populate('user')
      .exec((err, posts) => {
        if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
        return res.status(200).json(posts);
      });
  });
}

// PUBLIC FEED
function feed(req, res) {
  User.findById(req.user._id, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    const userIds = user.following;
    userIds.push(req.user._id);

    Post.find({ user: { $in: userIds } })
      .populate('user')
      .exec((err, posts) => {
        if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
        return res.status(200).json(posts);
      });

  });
}


//SHOW
function usersShow(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    if (!user) return res.status(404).json({ message: 'No user found.' });
    return res.status(200).json(user);
  });
}

//UPDATE
function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    if (!user) return res.status(404).json({ message: 'No user found.' });
    return res.status(200).json(user);
  });
}

//DELETE
function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    return res.status(204).send();
  });
}

module.exports = {
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  feed: feed,
  posts: posts,
  following: following,
  followers: followers
};
