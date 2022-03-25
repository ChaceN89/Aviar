const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    //id is created automatically
    username: {
      type: String,
      required: [true, 'Please add name']
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    userPosts: [
      {
        // array of posts
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Post' // reference to a model of Post
      }
    ], // array of user post ids
    //could add liked posts in here if we want
    savedPosts: [
      {
        // array of collections
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Collection' // reference to a model of Post
      }
    ] // saved posts is array of
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end userSchema

module.exports = mongoose.model('User', userSchema) //export userSchema as User
