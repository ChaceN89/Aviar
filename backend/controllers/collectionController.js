const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel') // models
const User = require('../models/userModel')
const Collection = require('../models/collectionModel')
const valid = require('../middleware/validateID')

//@desc add collection and post (:id is id of post)
//@route  POST collection /api/collections/:id
//@access private
const addCollectionAndPost = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.params.id) {
    res.status(400)
    throw new Error('Need to add name or id')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Please enter valid Post id')
  }

  const collection = await Collection.create({
    collectionName: body.name,
    PostList: [req.params.id]
  })

  await User.findByIdAndUpdate(
    req.user.id,
    { $push: { savedPosts: collection._id } },
    done
  )

  const user = await User.findById(req.user.id)
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }
  res.status(200).json(user.savedPosts)
}) //end

//@desc add collection
//@route  POST collection /api/collections/
//@access private
const addCollection = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Need to add name of collection')
  }

  const collection = await Collection.create({
    collectionName: body.name,
    PostList: []
  })

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { savedPosts: collection._id } },
    done
  )

  res.status(200).json({
    message: `collection added`,
    user
  })
}) //end

//@desc delete collection
//@route  DELETE collection /api/collections/:id
//@access private   takes id
const deleteCollection = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Need new collection id')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Please enter valid collection id')
  }
  const collection = await Collection.findByIdAndDelete(req.params.id)

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { savedPosts: req.params.id }
  })

  const user = await User.findById(req.user.id)
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }

  res.status(200).json(user.savedPosts)
}) //end

//@desc add Post to Collection
//@route  POST collection /api/collections/:cid/:pid
//@access private
const addPostToCollection = asyncHandler(async (req, res) => {
  if (!req.params.pid || !req.params.cid) {
    res.status(400)
    throw new Error('Need to add an id')
  }
  if (
    !valid.isValidObjectId(req.params.pid) ||
    !valid.isValidObjectId(req.params.cid)
  ) {
    res.status(400)
    throw new Error('Please enter valid id')
  }

  const collection = await Collection.findByIdAndUpdate(
    req.params.cid,
    { $push: { PostList: req.params.pid } },
    done
  )

  const user = await User.findById(req.user.id)
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }
  res.status(200).json(user.savedPosts)
}) //end

//@desc Remove Post to Collection
//@route  DELETE collection /api/collections/:cid/:pid
//@access private
const removePostFromCollection = asyncHandler(async (req, res) => {
  if (!req.params.cid || !req.params.pid) {
    res.status(400)
    throw new Error('Need to add an id')
  }
  if (
    !valid.isValidObjectId(req.params.cid) ||
    !valid.isValidObjectId(req.params.pid)
  ) {
    res.status(400)
    throw new Error('Please enter valid id')
  }

  const collection = await Collection.findByIdAndUpdate(
    req.params.cid,
    { $pull: { PostList: req.params.pid } },
    done
  )

  const user = await User.findById(req.user.id)
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }
  res.status(200).json(user.savedPosts)
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
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }
  res.status(200).json(user.savedPosts)
}) //end getCollections

//@desc Update collection name
//@route  PUT collection /api/collections/:id
//@access private
const updateCollectionName = asyncHandler(async (req, res) => {
  if (!req.body.collectionName || !req.params.id) {
    res.status(400)
    throw new Error('Need new collection name')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Please enter valid collection id')
  }
  const collection = await Collection.findByIdAndUpdate(
    req.params.id,
    { collectionName: req.body.collectionName },
    { new: true }
  )

  const user = await User.findById(req.user.id)
    .populate({
      path: 'savedPosts',
      populate: { path: 'PostList' }
    })
    .exec()

  if (!user.populated('savedPosts')) {
    res.status(400)
    throw new Error('Could not pupulate saved posts')
  }
  res.status(200).json(user.savedPosts)
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
