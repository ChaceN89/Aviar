const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const valid = require('../middleware/validateID')

//@desc Create new Post
//@route  POST /api/posts
//@access private
const createPost = asyncHandler(async (req, res) => {
  if (!req.user.id || !req.body.caption  || !req.body.theme || !req.body.medium  ) {
    res.status(400)
    throw new Error('Please add Post Information')
  }
  
  if (req.files === null) { // check that there is a file attached
    res.status(400)
    throw new Error('No File Selected') // this doens't work but i can't see a reason my not
  }

  const file = req.files.file;
  const newFileName = Date.now() + file.name // new unique name

  const acceptedImageTypes = ['image/gif', 'image/jpeg', 
  'image/png', 'image/jpg','image/x-icon'];

  if(!acceptedImageTypes.includes(file.mimetype)){ // handle file of the wrong format
    res.status(400)
    throw new Error('Incorrect File Format') // this doens't work but i can't see a reason my not
  }

  // set file to a directory with a specific name in that directory
  file.mv(`${__dirname}/../../frontend/public/uploads/${newFileName}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err); // server error
    }
  });
  // file is in directory now

  // create post
  const post = await Post.create({
    user: req.user.id, // set user as well

    imgPath: newFileName, // name of new image

    caption: req.body.caption,
    //no comments to start
    //no ratings 
    numLikes: 0,
    theme: req.body.theme,
    medium: req.body.medium
    //no tags for now
  })

  // add post to user array
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $push: { userPosts: post._id } //add to array
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  console.log('New Post created ' + req.body.caption)
  res.status(200).json(post)
})

//@desc Get all posts
//@route  GET /api/posts
//@access public
const getAllPosts = asyncHandler(async (req, res) => {
  const filter = {}
  const all = await Post.find(filter)
  const allPosts = await Post.find()
  res.status(200).json(allPosts)
})

//@desc Delete POST
//@route  DELETE /api/posts/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('post not found')
  }
  if (!req.user) {
    // this user doesn't exist
    res.status(401)
    throw new Error('User not found')
  }
  if (post.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await post.remove()

  // delete from user array
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $pull: { userPosts: req.params.id } //add to array
    },
    {
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json({
    // old way of just sending a json message back to frontm end client
    message: `post deleted`,
    post,
    user
  })
})

//@desc get POST
//@route  get /api/posts/:id
//@access public
const getPost = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Please enter a Post id')
  }
  //check if id is valid
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Please enter valid Post id')
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
    // null post
    res.status(400)
    throw new Error('post not found')
  }

  console.log('getting post # ' + req.params.id)
  res.status(200).json(post)
})

//@desc aff comment
//@route  post /api/posts/comment/:id
//@access private
const addComment = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  console.log(req.body.comment)

  if (!req.params.id || !req.body.comment) {
    res.status(400)
    throw new Error('Need Post information')
  }
  const post1 = await Post.findById(req.params.id)
  if (!post1) {
    res.status(400)
    throw new Error('Post not found')
  }

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { comments: req.body.comment } //add to array
    },
    {
      new: true,
      upsert: false // don't create new obeject
    }
  )

  res.status(200).json(post) // returns old object before update object
})

//@desc remove comment
//@route  delete /api/posts/comment/:id
//@access private
const removeComment = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Need ID')
  }

  res.status(200).json({
    message: 'removeComment'
  })
})

//@desc aff comment
//@route  get /api/posts/search
//@access public
const getPostsByTerm = asyncHandler(async (req, res) => {
  if (!req.body.term) {
    res.status(400)
    throw new Error('no search Term')
  }
  //jsut change caption to tag or theme to change fucntionality
  const post = await Post.find({ caption: { $regex: `${req.body.term}` } })

  res.status(200).json(post)
})

//@desc add like post
//@route  get /api/posts/
//@access public
const addLikeToPost = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Need post ID')
  }

  const post = await Post.updateOne(
    {
      _id: req.params.id // post of this id
    },
    {
      $inc: {
        numLikes: 1
      }
    }
  )

  res.status(200).json({
    message: 'added like to post',
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
