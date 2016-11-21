const mongoose  = require('mongoose');
const Like  = require('./like');
const Comment  = require('./comment');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  bodyText: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  latlng: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  comments: [ Comment.schema ],
  likes: [ Like.schema ]
},{
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
