const express = require('express');
const router = express.Router(); // using express to set up a router
const { // way of importing things
    createPost,
    getPost,
    deletePost,
    getAllPosts,
    addComment,
    getPostsByTerm,
    removeComment
    
} = require('../controllers/postController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').post(protect, createPost)
router.route('/comment/id').post(protect, addComment)
router.route('/comment/id').delete(protect, removeComment)
router.route('/search').get( getPostsByTerm)
router.route('/').get(getAllPosts)
router.route('/id').get(getPost)
router.route('/id').delete(protect, deletePost)

module.exports = router;