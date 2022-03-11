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
    const {username, password} = req.body  // destruct data
        //only need to username and password to sign in 
    
    if(!username || !password){ // these aren't included
        res.status(400); //400 Bad Request
        throw new Error('Please add all fields');
    }

    //hash password using bcyrpt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create users = await
    const user = await User.create({
        username,
        password: hashedPassword
    })

    if(user){ // if user created
        res.status(200).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id) // passing id to generate token
        });
    }else{
        res.status(400);
        throw new Error('could not create user - Invalid data'); 
    }


})//end route


//exports
module.exports = {
    registerUser,
    
}