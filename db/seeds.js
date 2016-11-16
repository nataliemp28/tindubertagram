const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const db = require('../config/db');

mongoose.connect(db.uri);

User.create([{
  email: 'oli@test.com',
  firstName: 'Oli',
  lastName: 'Moore',
  bio: 'I love da cheese',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
},{
  email: 'thea@test.com',
  firstName: 'thea',
  lastName: 'Carter',
  bio: 'I love da cheese too',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
},{
  email: 'nat@test.com',
  firstName: 'nat',
  lastName: 'Pateman',
  bio: 'I also love da cheese',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
}], (err, users) => {

  if(err) return console.log(err);

  Post.create([{
    title: 'Example Post',
    image: 'i am an image',
    bodyText: 'i am a new post',
    user: users[0],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  },{
    title: 'Example Post 2',
    image: 'i am an image',
    bodyText: 'i am a new post',
    user: users[1],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  }], () => {

    users[0].following = [users[1], users[2]];
    users[0].save(() => {
      console.log('User 1 saved!');
    });

    users[1].following = [users[0], users[2]];
    users[1].save(() => {
      console.log('User 2 saved!');
    });

    users[2].following = [users[1], users[0]];
    users[2].save(() => {
      console.log('User 3 saved!');
    });
  });

});
