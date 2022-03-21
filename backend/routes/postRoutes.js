const express = require('express');
const router = express.Router(); // using express to set up a router
const { // way of importing things
    createPost,
    getPost,
    deletePost,
    getAllPosts
    
} = require('../controllers/postController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').post(protect, createPost)
router.route('/').get(getAllPosts)
router.route('/id').get(getPost)
router.route('/id').delete(protect, deletePost)

//protected verison of the same thing
// router.route('/').get(protect, function)
// router.route('/:id').put(protect, updateGoal)

//functions from controller and sending to certian endpoints



module.exports = router;