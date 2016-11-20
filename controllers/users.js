const User = require('../models/user');
const Post = require('../models/post');

//FOLLOWERS
function followers(req, res) {
  // Getting User by current user id, current user id is being attached to req by secureRoutes
  User.findById(req.user._id, (err) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    // Getting all users that have the current user's id in their following array
    User.find(({ following: req.user._id }), (err, users) => {
      if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
      return res.status(200).json(users);
    });
  });
}

//FOLLOWING
function following(req, res) {
  // Getting User by current user id, current user id is being attached to req by secureRoutes
  User.findById(req.user._id, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    const followingIds = user.following;
    // Finding the users where their id is contained within the current user's following array
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
  Post.find({ user: req.params.id })
    .sort({createdAt: -1})
    .populate('user')
    .exec((err, posts) => {
      if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
      if (!posts) return res.status(404).json({ message: 'No posts found.' });
      console.log(posts);
      return res.status(200).json(posts);
    });
}

// PUBLIC FEED
function feed(req, res) {
  // Getting User by current user id, current user id is being attached to req by secureRoutes
  User.findById(req.user._id, (err, user) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    const userIds = user.following;
    userIds.push(req.user._id);
    // Finding posts where the user is equal to the current user's id or their followers ids
    Post.find({ user: { $in: userIds } })
      .sort({createdAt: -1})
      .populate('user')
      .exec((err, posts) => {
        if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
        return res.status(200).json(posts);
      });

  });
}

//SEARCH
function usersSearch(req, res) {
  console.log(req.query);
  User.find( { firstName: new RegExp( req.query.search, 'i')}, (err, users) => {
    if (err) return res.status(500).json({ messsage: 'Something went wrong.', error: err });
    return res.status(200).json(users);
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
  search: usersSearch,
  update: usersUpdate,
  delete: usersDelete,
  feed: feed,
  posts: posts,
  following: following,
  followers: followers
};
