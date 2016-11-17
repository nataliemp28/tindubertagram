const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;


//CREATE
function register(req, res){
  User.create(req.body, (err, user) => {
    console.log(err);
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    const payload = { _id: user._id, firstName: user.firstName };
    const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: `Welcome ${user.firstName}!`,
      user,
      token
    });
  });
}

function login(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const payload = { _id: user._id, firstName: user.firstName };
    const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: 'Welcome back.',
      user,
      token
    });
  });
}

module.exports = {
  register: register,
  login: login
};
