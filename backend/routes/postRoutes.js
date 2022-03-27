const express = require('express')
const router = express.Router() // using express to set up a router
const {
  // way of importing things
  createPost,
  getPost,
  deletePost,
  getAllPosts,
  addComment,
  getPostsByTerm,
  removeComment,
  addLikeToPost
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createPost)
router.route('/comment/:id').post(protect, addComment)
router.route('/comment/:id').delete(protect, removeComment) // not used
router.route('/search/:term').get(getPostsByTerm)
router.route('/').get(getAllPosts)
router.route('/:id').get(getPost)
router.route('/:id').delete(protect, deletePost)
router.route('/').put(addLikeToPost)

module.exports = router
