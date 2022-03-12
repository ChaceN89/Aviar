// takes request and response
const jwt = require('jsonwebtoken'); // json web token
const bcrypt = require('bcryptjs'); // encrypting
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel"); // import usermodel

/**
 * @desc register a new user
 * @route POST /api/users
 * @access public
 */
const registerUser = asyncHandler( async (req, res) => {
    // res.json({message:"need to create user"});
    
    console.log("here");
    const {username, password} = req.body  // destruct data
    console.log("here2");
    //only need to username and password to sign in 
    if(!username || !password){ // these aren't included
        res.status(400); //400 Bad Request
        console.log("Please Add All Fields");
        throw new Error('Please Add All Fields');
    }
    console.log("here3");
    
    const userExists = await User.findOne({username}); // access database to see if user already exists
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists');   
    }
    
    console.log("here4");
    //hash password using bcyrptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create users = await
    const user = await User.create({
        username,
        password: hashedPassword

        //might need to set rest of items null ?????

    })

    if(user){ // if user created
        res.status(200).json({
            _id: user.id,  // the created id
            username: user.username,
            userPosts: user.userPosts,
            savedPosts: user.savedPosts,
            token: generateToken(user._id) //also send token to user
        });
    }else{
        res.status(400);
        throw new Error('Could Not Create User - Invalid Entry'); 
    }

})//end route




/**
 * @desc login/authenticate a  user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username}); /// find by username

     //password is hashed need to bcyrpt method called compare
     if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({ // return current withthe jwt
            _id: user.id,  // the created id
            username: user.username,
            userPosts: user.userPosts,
            savedPosts: user.savedPosts,
            token: generateToken(user._id) //also send token to user
        });

    }else{
        res.status(400);
        throw new Error('Invalid Credentials'); 
    }

})//end loginUser


/**
 * @desc get User data
 * @route GET /api/users/me
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 * @access private
 */
const getMe  = asyncHandler( async (req, res) => {
    const{ _id, username, userPosts, savedPosts } = await User.findById(req.user.id)
    // const{ _id, username, userPosts, savedPosts } = await User.findById(req.user.id)

    res.status(200).json({ // return user
        id:_id,
        username,
        userPosts, 
        savedPosts
    });
}) //end getMe




//Generate JWT Function
const generateToken = (id) => {
    //an id, the enviroment variable secret      
    return jwt.sign({ id }, process.env.JWT_SECRET ,{
            expiresIn: '30d', // time to expire 
        })
}//end function


//exports
module.exports = {
    registerUser,
    loginUser,
    getMe,
}