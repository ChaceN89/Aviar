const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');  // models
const User = require('../models/userModel');
const valid = require('../middleware/validateID');
const { find, collection } = require('../models/postModel');

//req.user.id  from protection middleware
//collection
    //collectionName
    //PostList


//@desc add collection and post
//@route  POST collection /api/collections/
//@access private
const addCollectionAndPost = asyncHandler(async(req, res) => {
    if(!req.body.name ||!req.body.id){
        res.status(400);
        throw new Error("Need to add name or id");
    }
    if(!valid.isValidObjectId(req.body.id)){
        res.status(400);
        throw new Error("Please enter valid Post id");
    }

    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {$push: { savedPosts: {
                    collectionName: req.body.name,
                    PostList:req.body.id
                }
        } , //add to array of collections
    },{
        new: true,
        upsert: false // don't create new obeject
    })
    
    res.status(200).json({  
        message: `collection added`,
        postid : req.body.id,
        user
    });

})

//@desc add collection and post
//@route  POST collection /api/collections/
//@access private
const addCollection = asyncHandler(async(req, res) => {
    if(!req.body.name ){
        res.status(400);
        throw new Error("Need to add name of collection");
    }

    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {$push: { savedPosts: {
                    collectionName: req.body.name,
                }
        } , //add to array of collections
    },{
        new: true,
        upsert: false // don't create new obeject
    })
    
    res.status(200).json({  
        message: `collection added`,
        user
    });

})

//@desc delete collection
//@route  DELETE collection /api/collections
//@access private   takes id
const deleteCollection = asyncHandler(async(req, res) => {
    if(!req.body.id ){
        res.status(400);
        throw new Error("Need collection id");
    }

    
    if(!req.user){ // this user doesn't exist 
        res.status(401);
        throw new Error("User not found");
    }
    
    user.find({

    })
  
    // await collection.remove()





    res.status(200).json({
        message: "delete collection"
    });
})

//@desc add Post to Collection
//@route  POST collection /api/collections/id
//@access private
const addPostToCollection = asyncHandler(async(req, res) => {

    res.status(200).json({
        message: "add Post To Collection"
    });
})


//@desc Remove Post to Collection
//@route  DELETE collection /api/collections/id
//@access private
const removePostFromCollection = asyncHandler(async(req, res) => {

    res.status(200).json({
        message: "remove Post From Collection"
    });
})


//@desc Get my Collection array of names/or ids if that is amde for me
//@route  GET collection /api/collections/
//@access private
const getCollectionNames = asyncHandler(async(req, res) => {

    res.status(200).json({
        message: "get Collection Names"
    });

})

//@desc Get my Collection
//@route  GET collection /api/collections/posts
//@access private
const getCollectionPosts = asyncHandler(async(req, res) => {

    res.status(200).json({
        message: "get Collection Posts"
    });

})

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


//@desc Update colelction name
//@route  PUT collection /api/collections
//@access private
const updateCollectionname = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "update Collection name"
    });
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
    updateCollectionname
}