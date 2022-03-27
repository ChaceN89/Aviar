const mongoose = require('mongoose')

const collectionSchema = mongoose.Schema(
  {
    collectionName: {
      // a collection
      type: String,
      required: [true, 'Please add a collection title']
    },
    PostList: [
      { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Post' }
    ]
  },
  {
    timestamps: true // automatically creates time stamps for updated and created
  }
) //end collectionSchema

module.exports = mongoose.model('Collection', collectionSchema) //export collectionSchema as Collection
