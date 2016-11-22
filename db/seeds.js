const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const db = require('../config/db');

mongoose.connect(db.uri);

User.collection.drop();
Post.collection.drop();

User.create([{
  email: 'oli@test.com',
  firstName: 'Oli',
  lastName: 'Moore',
  bio: 'I love da cheese',
  image: 'https://s3-eu-west-1.amazonaws.com/ga-travel-app/0a6e2580-b003-11e6-a2f4-4d7b4c5808ce.png',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'thea@test.com',
  firstName: 'thea',
  lastName: 'Carter',
  bio: 'I love da cheese too',
  image: 'https://s3-eu-west-1.amazonaws.com/ga-travel-app/0a6e2580-b003-11e6-a2f4-4d7b4c5808ce.png',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'nat@test.com',
  firstName: 'nat',
  lastName: 'Pateman',
  bio: 'I also love da cheese',
  image: 'https://s3-eu-west-1.amazonaws.com/ga-travel-app/0a6e2580-b003-11e6-a2f4-4d7b4c5808ce.png',
  password: 'password',
  passwordConfirmation: 'password'
}], (err, users) => {

  if(err) return console.log(err);

  Post.create([{
    title: 'Example Post',
    image: 'b6caa7a0-affd-11e6-a2f4-4d7b4c5808ce.jpeg',
    bodyText: `<h1>I can do that</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>

<h1>We happy?</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>`,
    user: users[0],
    latlng: {
      lat: 50,
      lng: 0
    },
    comments: null,
    likes: null
  },{
    title: 'Example Post 2',
    image: 'b6caa7a0-affd-11e6-a2f4-4d7b4c5808ce.jpeg',
    bodyText: `<h1>I can do that</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>

<h1>We happy?</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>`,
    user: users[1],
    latlng: {
      lat: 100,
      lng: 50
    },
    comments: null,
    likes: null
  },{
    title: 'Example Post 3',
    image: 'b6caa7a0-affd-11e6-a2f4-4d7b4c5808ce.jpeg',
    bodyText: `<h1>I can do that</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>

<h1>We happy?</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>`,
    user: users[2],
    latlng: {
      lat: 50,
      lng: -50
    },
    comments: null,
    likes: null
  },{
    title: 'Example Post 4',
    image: 'b6caa7a0-affd-11e6-a2f4-4d7b4c5808ce.jpeg',
    bodyText: `<h1>I can do that</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>

<h1>We happy?</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>`,
    user: users[1],
    latlng: {
      lat: 100,
      lng: 100
    },
    comments: null,
    likes: null
  },{
    title: 'Example Post 5',
    image: 'b6caa7a0-affd-11e6-a2f4-4d7b4c5808ce.jpeg',
    bodyText: `<h1>I can do that</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>

<h1>We happy?</h1>
<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>`,
    user: users[0],
    latlng: {
      lat: 51.51,
      lng: -0.08
    },
    comments: [{
      userId: users[0],
      bodyText: 'Example comment'
    }],
    likes: [{
      userId: users[0]
    }]
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
