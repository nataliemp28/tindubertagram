const request = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;

function facebook(req, res) {
  //REQUEST AN ACCESS TOKEN
  request.get({
    url: 'https://graph.facebook.com/v2.5/oauth/access_token',
    qs: {
      code: req.body.code,
      client_id: process.env.FACEBOOK_TRAVEL_APP_ID,
      client_secret: process.env.FACEBOOK_TRAVEL_APP_SECRET,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {
    //request user's profile with accessToken
    return request.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });

  }).then((profile) => {
    //find or create a user
    User.findOne({ email: profile.email }, (err, user) => {
      if(err) return res.status(500).json({error: err });

      if(!user) {
        user = new User({
          facebookId: profile.id,
          // profileImage: profile.picture.data.url,
          email: profile.email
          // username: `${profile.name} ${profile.id}`
        });
      } else {
        user.facebookId = profile.id;
        // user.profileimage = profile.picture.data.url;
      }
      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        //geenrate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h'});

        res.status(200).json({
          user,
          token
        });
      });

    });
  });

}

function instagram(req, res) {
  //REQUEST AN ACCESS TOKEN
  request.get({
    url: 'https://api.instagram.com/oauth/authorize/?client_id='+process.env.INSTAGRAM_APP_ID+'&redirect_uri=http://:localhost:8000/&response_type=code'
    // qs: {
    //   code: req.body.code,
    //   client_id: process.env.INSTAGRAM_TRAVEL_APP_ID,
    //   client_secret: process.env.INSTAGRAM_TRAVEL_APP_SECRET,
    //   redirect_uri: req.body.redirectUri
    // },
    // json: true
  }).then(() => {
    console.log(req.body.code);

    const params = {
      code: req.body.code,
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_APP_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };
    //request user's profile with accessToken
    return request.post({
      url: 'https://api.instagram.com/oauth/access_token',
      form: params,
      json: true
    });

  }).then((profile) => {
    console.log(profile);
    // find or create a user
    User.findOne({ instagramId: profile.id }, (err, user) => {
      if(err) return res.status(500).json({error: err });

      if(!user) {
        user = new User({
          instagramId: profile.id,
          // profileImage: profile.picture.data.url,
          firstName: profile.username
          // username: `${profile.name} ${profile.id}`
        });
      } else {
        user.instagramId = profile.id;
        // user.profileimage = profile.picture.data.url;
      }
      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        //geenrate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h'});

        res.status(200).json({
          user,
          token
        });
      });
    });
  });

}


module.exports = {
  facebook,
  instagram
};
