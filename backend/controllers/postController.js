const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const valid = require('../middleware/validateID');




//@desc Create new Post
//@route  POST /api/posts
//@access private
const createPost = asyncHandler(async(req, res) => {

    if(!req.user.id || !req.body.imgPath || !req.body.caption){
        res.status(400);
        throw new Error('Please add Post Information');  
    }

    // create post
    const post = await Post.create({
        user: req.user.id, // set user as well

        imgPath :req.body.imgPath, // might need to change to 
            // image handling

        caption :req.body.caption,
        //no comments to start
        numLikes: 0,
        theme :req.body.theme,
        medium :req.body.medium,
        //no tags for now
    })
   
    // add post to user array 
    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {$push: { userPosts: post._id } //add to array 
    },{
        new: true,
        upsert: false // don't create new obeject
    })
   
    console.log("New Post created "+ req.body.caption );
    res.status(200).json(post);
    

})

//@desc Get all posts  
//@route  GET /api/posts
//@access public
const getAllPosts = asyncHandler(async(req, res) => {
    const filter = {};
    const all = await Post.find(filter);
    const allPosts = await Post.find();
    res.status(200).json(allPosts);

})


//@desc Delete POST
//@route  DELETE /api/posts/id
//@access private
const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.body.id);
    if(!post){
        res.status(400);
        throw new Error("post not found");
    }
    if(!req.user){ // this user doesn't exist 
        res.status(401);
        throw new Error("User not found");
    }
    if(post.user.toString() != req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
  
    await post.remove()

    // delete from user array
    const user = await User.findOneAndUpdate({ _id: req.user.id },{
        $pull: { userPosts: req.body.id } , //add to array 
    },{
       upsert: false // don't create new obeject
    })
    
    res.status(200).json({  // old way of just sending a json message back to frontm end client
        message: `post deleted`,
        post,
        user
    });


})

//@desc get POST
//@route  get /api/posts/id
//@access public
const getPost = asyncHandler(async(req, res) => {
    
    if(!req.body.id){
        res.status(400);
        throw new Error("Please enter a Post id");
    }
    //check if id is valid
    if(!valid.isValidObjectId(req.body.id)){
        res.status(400);
        throw new Error("Please enter valid Post id");
    }


    const post = await Post.findById( req.body.id   ) // get all goals from database
    if(!post){ // null post
        res.status(400);
        throw new Error("post not found");
    }
    
    console.log("getting post # "+ req.body.id);
    res.status(200).json(post);

})

//@desc aff comment
//@route  post /api/posts/comment/id
//@access private
const addComment = asyncHandler(async(req, res) => {
    console.log(req.body.id)
    console.log(req.body.comment)
    
    if(!req.body.id || !req.body.comment){
        res.status(400);
        throw new Error("Need Post information");
    }
    const post1 = await Post.findById(req.body.id);
    if(!post1){
        res.status(400);
        throw new Error("Post not found");
    }

    const post = await Post.findOneAndUpdate({ _id: req.body.id },{
        $push: { comments: req.body.comment } , //add to array 
    },{
        new:true,
        upsert: false // don't create new obeject
    })


    res.status(200).json(post) // returns old object before update object 
})

//@desc remove comment
//@route  delete /api/posts/comment/id
//@access private
const removeComment = asyncHandler(async(req, res) => {
    if(!req.body.id){
        res.status(400);
        throw new Error("Need ID");
    }


    
    res.status(200).json({
        message: "removeComment"
    })


})


//@desc aff comment
//@route  get /api/posts/search
//@access public
const getPostsByTerm = asyncHandler(async(req, res) => {
    if(!req.body.term){
        res.status(400);
        throw new Error("no search Term");
    }
            //jsut change caption to tag or theme to change fucntionality
    const post = await Post.find({ caption: { $regex: `${req.body.term}` } });
    
    res.status(200).json(post)
})


//@desc add like post
//@route  get /api/posts/
//@access public
const addLikeToPost = asyncHandler(async(req, res) => {
    if(!req.body.id){
        res.status(400);
        throw new Error("Need post ID");
    }

    const post = await Post.updateOne({ 
            _id:req.body.id // post of this id
        },{
            $inc:{
                numLikes: 1
            }
        })

    res.status(200).json({
        message: "added like to post",
        post
    })
})



module.exports = {
    createPost,
    getPost,
    deletePost,
    getAllPosts,
    addComment,
    getPostsByTerm,
    removeComment,
    addLikeToPost
}