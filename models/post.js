const mongoose  = require('mongoose');
const Like  = require('./like');
const Comment  = require('./comment');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, get: addImagePath, set: removeImagePath  },
  bodyText: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  latlng: { type: String, required: true },
  comments: [ Comment.schema ],
  likes: [ Like.schema ]
},{
  timestamps: true
});

function addImagePath(image){
  if (!image) return null;
  return `https://s3-eu-west-1.amazonaws.com/ga-travel-app/${image}`;
}

function removeImagePath(fullPath){
  return fullPath.split('/').splice(-1)[0];
}

postSchema.set('toJSON', {
  getters: true
});

module.exports = mongoose.model('Post', postSchema);
