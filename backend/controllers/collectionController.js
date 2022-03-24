const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel') // models
const User = require('../models/userModel')
const valid = require('../middleware/validateID')

//@desc add collection and post
//@route  POST collection /api/collections/
//@access private
const addCollectionAndPost = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.id) {
    res.status(400)
    throw new Error('Need to add name or id')
  }
  if (!valid.isValidObjectId(req.body.id)) {
    res.status(400)
    throw new Error('Please enter valid Post id')
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $push: {
        savedPosts: {
          collectionName: req.body.name,
          PostList: req.body.id
        }
      } //add to array of collections
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    message: `collection added`,
    postid: req.body.id,
    user
  })
}) //end

//@desc add collection and post
//@route  POST collection /api/collections/
//@access private
const addCollection = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Need to add name of collection')
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $push: {
        savedPosts: {
          collectionName: req.body.name
        }
      } //add to array of collections
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    message: `collection added`,
    user
  })
}) //end

//@desc delete collection
//@route  DELETE collection /api/collections
//@access private   takes id
const deleteCollection = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400)
    throw new Error('Need new collection id')
  }
  if (!valid.isValidObjectId(req.body.id)) {
    res.status(400)
    throw new Error('Please enter valid collection id')
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { savedPosts: { _id: req.body.id } } },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    message: 'Collection Deleted',
    user
  })

  res.status(200).json({
    message: 'delete collection'
  })
}) //end

//@desc add Post to Collection
//@route  POST collection /api/collections/:id
//@access private
const addPostToCollection = asyncHandler(async (req, res) => {
  if (!req.body || !req.params.id) {
    res.status(400)
    throw new Error('Need to add an id')
  }
  if (
    !valid.isValidObjectId(req.body) ||
    !valid.isValidObjectId(req.params.id)
  ) {
    res.status(400)
    throw new Error('Please enter valid id')
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id, 'savedPosts._id': req.params.id },
    {
      $push: {
        'savedPosts.$.PostList': req.body
      }
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    message: `post added to collection`,
    user
  })
}) //end

//@desc Remove Post to Collection
//@route  DELETE collection /api/collections/:id
//@access private
const removePostFromCollection = asyncHandler(async (req, res) => {
  if (!req.body || !req.params.id) {
    res.status(400)
    throw new Error('Need to add an id')
  }
  if (
    !valid.isValidObjectId(req.body) ||
    !valid.isValidObjectId(req.params.id)
  ) {
    res.status(400)
    throw new Error('Please enter valid id')
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id, 'savedPosts._id': req.params.id },
    {
      $pull: {
        'savedPosts.$.PostList': req.body
      }
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    message: `post removed to collection`,
    user
  })
}) //end

//-----------------------------------------------------------------
//-------------------might not need theses two---------------------
//-----------------------------------------------------------------
//@desc Get my Collection array of names/or ids if that is amde for me
//@route  GET collection /api/collections/
//@access private
const getCollectionNames = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'get Collection Names'
  })
})

//@desc Get my Collection
//@route  GET collection /api/collections/posts
//@access private
const getCollectionPosts = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'get Collection Posts'
  })
})

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------

/**
 * @desc get user's collections
 * @route GET /api/users/collections
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 * @access private
 */
const getCollections = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  res.status(200).json(user.savedPosts)
}) //end getCollections

//@desc Update colelction name  new name and colelction id
//@route  PUT collection /api/collections
//@access private
const updateCollectionName = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.id) {
    res.status(400)
    throw new Error('Need new collection name')
  }
  if (!valid.isValidObjectId(req.body.id)) {
    res.status(400)
    throw new Error('Please enter valid collection id')
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id, 'savedPosts._id': req.body.id },
    { $set: { 'savedPosts.$.collectionName': req.body.name } },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )
  res.status(200).json({
    message: 'update name updated',
    user
  })
}) //end getCollections

//exports
module.exports = {
  addCollection,
  addCollectionAndPost,
  deleteCollection,
  addPostToCollection,
  removePostFromCollection,
  getCollectionNames,
  getCollectionPosts,
  getCollections,
  updateCollectionName
}
