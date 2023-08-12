const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  pictures: {
    type: Array,
    required: true
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,

   posts: [{
        type: Schema.Types.ObjectId, ref: "Post"
    }]
}, {
  timestamps: true
});

const User = model("User", userSchema)
module.exports = User