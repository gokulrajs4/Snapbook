const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  pictures: Array,
  postPictures: Array,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
})

const Post = model("Post", postSchema)


module.exports = Post