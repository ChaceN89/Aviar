const express = require('express')
const router = express.Router()
const {
  //import functions from postcontroller
  addCollectionAndPost,
  addCollection,
  deleteCollection,
  addPostToCollection,
  removePostFromCollection,
  getCollectionNames,
  getCollectionPosts,
  getCollections,
  updateCollectionName
} = require('../controllers/collectionController')

const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)

//create colelctions and delte collection
router.post('/post', protect, addCollectionAndPost) // add collection and post
router.post('/', protect, addCollection) // add a new collection with no posts
router.delete('/', protect, deleteCollection) // jacob

//update colelction
router.put('/', protect, updateCollectionName) // jacob

//add or remove posts from a collection
router.post('/:id', protect, addPostToCollection)
router.delete('/:id', protect, removePostFromCollection)

//get collections or posts of a collection  -- these aren't used since getCollections handles enough
router.get('/names', protect, getCollectionNames)
router.get('/posts', protect, getCollectionPosts)

//get current user's collections
router.get('/', protect, getCollections) // private/protected

module.exports = router
