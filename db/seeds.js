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
  image: '/assets/images/sam.jpg',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
},{
  email: 'thea@test.com',
  firstName: 'thea',
  lastName: 'Carter',
  bio: 'I love da cheese too',
  image: '/assets/images/sam.jpg',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
},{
  email: 'nat@test.com',
  firstName: 'nat',
  lastName: 'Pateman',
  bio: 'I also love da cheese',
  image: '/assets/images/sam.jpg',
  password: 'examplePassword',
  passwordConfirmation: 'examplePassword'
}], (err, users) => {

  if(err) return console.log(err);

  Post.create([{
    title: 'Example Post',
    image: '/assets/images/example.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user: users[0],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  },{
    title: 'Example Post 2',
    image: '/assets/images/example.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user: users[1],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  },{
    title: 'Example Post 3',
    image: '/assets/images/example.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user: users[2],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  },{
    title: 'Example Post 4',
    image: '/assets/images/example.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user: users[1],
    latlng: 'new lat and lng',
    comments: null,
    likes: null
  },{
    title: 'Example Post 5',
    image: '/assets/images/example.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user: users[0],
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
