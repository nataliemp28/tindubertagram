const User = require('../models/user');

//SHOW
//UPDATE
//DELETE

//FOLLOWERS
//get all the people (by id, so whoever has clicked follow on your record, put them into an array) who are following you.
//FOLLOWING


//FOLLOWING - LIST OF PEOPLE YOU ARE FOLLOWING
function usersFollowing(req, res, currentUser) {
  User.find(({ _id: currentUser.following}), (err, users) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(users);
  });

}

//FOLLOWERS - PEOPLE WHO FOLLOW YOU.
function usersFollowers(req, res) {
  User.findById
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
  following: usersFollowing,
  followers: usersFollowers
};
