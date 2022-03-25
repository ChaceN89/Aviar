//entry point to server
console.log("Aviar server.js running");

const colors= require('colors');
const connectDB = require('./config/db'); // require the db file to acces mongodb
connectDB(); //set up a donnection to the database 

//set up values to sue in server
const express = require('express'); // get express
const dotenv = require('dotenv').config(); // use dotenv to load environment variables from .env file.
const{errorHandler} = require('./middleware/errorMiddleware'); // my errorhandler system that replaces the defualt

const port = process.env.PORT || 8000; // or 8000 if the enviroment variable in .env isn't available
const app = express(); // app represents express stuff
app.use(express.json()); // very important to parse requests from Post, Get etc
app.use(express.urlencoded({extended: false})); // need this for the type coming accross 


//file upload

const fileupload =require('express-fileupload');
const req = require('express/lib/request');

app.use(fileupload())

//createPost uplod request
const Post = require('./models/postModel')
const User = require('./models/userModel')


app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    //add to post

    // add id to user

    //put file into a place
    console.log("__dirname " +__dirname )

    const newFileName =   Date.now() + file.name

    // file.mv(`../${__dirname}/frontend/public/uploads/${file.name}`, err => {
    file.mv(`${__dirname}/../frontend/public/uploads/${newFileName}`, err => {
    console.log (err)
    if (err) {
        console.error(err);
        return res.status(500).send(err); // server error
    }


    console.log(" file name for database " + newFileName)



    //not issues al good default 200 status ok return file path
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});



/*
Old way

//@desc Create new Post
//@route  POST /api/posts
//@access private
const createPost = asyncHandler(async (req, res) => {
  if (!req.user.id || !req.body.imgPath || !req.body.caption) {
    res.status(400)
    throw new Error('Please add Post Information')
  }

  // create post
  const post = await Post.create({
    user: req.user.id, // set user as well

    imgPath: req.body.imgPath, // might need to change to
    // image handling

    caption: req.body.caption,
    //no comments to start
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




*/



//routes/endpoints
app.use('/api/users', require('./routes/userRoutes')); // all user routes
app.use('/api/posts', require('./routes/postRoutes')); // all Post routes
app.use('/api/collections', require('./routes/collectionRoutes')); // all collection routes

app.use(errorHandler); // override default error handlers

//listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, ()=> console.log("server started on http://localhost:" + port));

console.log("Server is Active".blue.bold);