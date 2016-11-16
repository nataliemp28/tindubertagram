const mongoose  = require('mongoose');
const Like  = require('./like');
const Comment  = require('./comment');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  bodyText: { type: String },
  userId: { type: String, required: true },
  latlng: { type: String, required: true },
  comments: [ Comment.schema ],
  likes: [ Like.schema ]
});

module.exports = mongoose.model('Post', postSchema);