const express = require('express');
const router = express.Router();
const {         //import functions from postcontroller
    addCollectionAndPost,
    addCollection,
    deleteCollection,
    addPostToCollection,
    removePostFromCollection,
    getCollectionNames,
    getCollectionPosts,
    getCollections,
    updateCollectionname
} = require('../controllers/collectionController');

const {protect} = require('../middleware/authMiddleware'); // to make routes private (need JWT)

/*
    router.get('/', protect, ); // private/protected
*/
router.post('/post',protect, addCollectionAndPost) // add collection and post
router.post('/',protect, addCollection) // add a new collection with no posts
router.delete('/',protect, deleteCollection) // jacob

//update colelction
router.put('/collections',protect, updateCollectionname) // jacob
    

router.post('/id',protect, addPostToCollection)
router.delete('/id',protect, removePostFromCollection) 

router.get('/names',protect, getCollectionNames)
router.get('/posts',protect, getCollectionPosts)

//get current user's collections
router.get('/', protect, getCollections) // private/protected

module.exports = router;
