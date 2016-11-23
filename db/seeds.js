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
  image: 'oli.jpg',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'thea@test.com',
  firstName: 'thea',
  lastName: 'Carter',
  bio: 'I love da cheese too',
  image: 'thea.jpg',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'nat@test.com',
  firstName: 'nat',
  lastName: 'Pateman',
  bio: 'I also love da cheese',
  image: 'nat.jpg',
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
  },
  {
    title: 'French Vineyard Tour',
    image: 'bordeaux.jpeg',
    bodyText: `<h1>Bordeaux</h1>
<p>Bordeaux, hub of the famed wine-growing region, is a port city on the Garonne River in southwestern France. It’s known for its Gothic Cathédrale Saint-André, 18th- to 19th-century mansions and notable art museums such as the Musée des Beaux-Arts de Bordeaux. Public gardens line the curving river quays. The grand Place de la Bourse, centered on the Three Graces fountain, overlooks the Miroir d’Eau reflecting pool.</p>

<h1>Burgundy</h1>
<p>Burgundy is a historical region in east-central France. It's famous for its Burgundy wines as well as Pinot Noirs and Chardonnays, Chablis and Beaujolais. The area is crisscrossed by a network of canals and studded with grand châteaux, some now luxury hotels. The capital, Dijon, of mustard fame, is home to the imposing Palace of the Dukes, where the distinguished Musée des Beaux-Arts was established in 1787.</p>`,
    user: users[2],
    latlng: {
      lat: 47.0525,
      lng: 4.3837
    },
    comments: null,
    likes: null
  },

  {
    title: 'A Jolly to Iceland',
    image: 'iceland.jpeg',
    bodyText: `<h1>Crazy crazy cold!</h1>
  <p>Iceland, a Nordic island nation, is defined by its dramatic landscape with volcanoes, geysers, hot springs and lava fields. Massive glaciers are protected in Vatnajökull and Snæfellsjökull national parks. Most of the population lives in the capital, Reykjavik, which runs on geothermal power and is home to the National and Saga museums, tracing Iceland’s Viking history.</p>`,
    user: users[2],
    latlng: {
      lat: 64.9631,
      lng: 19.0208
    },
    comments: null,
    likes: null
  },

  {
    title: 'Romantic Turkish Getaway',
    image: 'turkey.jpeg',
    bodyText: `<h1>Hot sunny Antalya</h1>
  <p>Antalya is a Turkish resort city with a yacht-filled Old Harbor and beaches flanked by large hotels. It's a gateway to Turkey's southern Mediterranean region, known as the Turquoise Coast for its blue waters. Remnants remain from Antalya's time as a major Roman port. These include Hadrian’s Gate, built to honor the Roman emperor’s visit in 130 A.D and 2nd-century Hidirlik Tower, with harbor views.</p>`,
    user: users[2],
    latlng: {
      lat: 36.8969,
      lng: 30.7133
    },
    comments: null,
    likes: null
  },

  {
    title: 'Sardinian Seaside',
    image: 'sardinia.jpeg',
    bodyText: `<h1>Sardinian Horse Trekking</h1>
  <p>Sardinia is a large Italian island in the Mediterranean Sea. It has nearly 2,000km of coastline, sandy beaches and a mountainous interior crossed with hiking trails. Its rugged landscape is dotted with thousands of nuraghi – mysterious Bronze Age stone ruins shaped like beehives. One of the largest and oldest nuraghi is Su Nuraxi in Barumini, dating to 1500 B.C..</p>`,
    user: users[2],
    latlng: {
      lat: 40.1209,
      lng: 9.0129
    },
    comments: null,
    likes: null
  },




  {
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
      userId: users[0]._id,
      bodyText: 'Example comment'
    }],
    likes: [{
      userId: users[0]._id
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
