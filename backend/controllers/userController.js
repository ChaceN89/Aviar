// takes request and response
const jwt = require('jsonwebtoken') // json web token
const bcrypt = require('bcryptjs') // encrypting
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') // import usermodel

/**
 * @desc register a new user
 * @route POST /api/users
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({message:"need to create user"});

  const { username, password } = req.body // destruct data

  //only need to username and password to sign in
  if (!username || !password) {
    // these aren't included
    res.status(400) //400 Bad Request
    throw new Error('Please Add All Fields')
  }

  //chekc to see if it already exisits
  const userExists = await User.findOne({ username }) // access database to see if user already exists
  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  //hash password using bcyrptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create users = await
  const user = await User.create({
    username,
    password: hashedPassword

    //might need to set rest of items null ?????
  })

  if (user) {
    // if user created
    res.status(200).json({
      _id: user.id, // the created id
      username: user.username,
      userPosts: user.userPosts,
      savedPosts: user.savedPosts,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Could Not Create User - Invalid Entry')
  }
}) //end registerUser route

/**
 * @desc login/authenticate a  user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username }) /// find by username

  //password is hashed need to bcyrpt method called compare
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // return current withthe jwt
      _id: user.id, // the created id
      username: user.username,
      userPosts: user.userPosts,
      savedPosts: user.savedPosts,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
}) //end loginUser

/**
 * @desc get User data
 * @route GET /api/users/me
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 * @access private
 */
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, userPosts, savedPosts } = await User.findById(
    req.user.id
  )

  res.status(200).json({
    // return user
    _id: _id,
    username,
    userPosts,
    savedPosts
  })
}) //end getMe

/**
 * @desc DELETE a user
 * @route DELETE /api/users
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const deleteMe = asyncHandler(async (req, res) => {
  const deletedUser = await User.findOneAndDelete({ _id: req.user.id }) // delete one user and return info

  res.status(200).json({
    // return information
    message: 'User Deleted',
    deletedUser
  })
}) //end deleteMe

/**
 * @desc update username
 * @route PUT /api/users/username
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const updateUsername = asyncHandler(async (req, res) => {
  const { username } = req.body
  if (!username) {
    res.status(400)
    throw new Error('Please Add New Username')
  }

  //set up fields to update
  const filter = { _id: req.user.id }
  const update = { username: username }

  const updatedUser = await User.findByIdAndUpdate(filter, update, {
    new: true
  }) // updatew trhe user

  res.status(200).json({
    //retrun object
    message: 'Updated Username',
    updatedUser
  })
}) //end updateUsername

/**
 * @desc update password
 * @route PUT /api/users/password
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * @access private
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  if (!password) {
    res.status(400)
    throw new Error('Please Add New Password')
  }

  //hash password using bcyrptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //set up fields to update
  const filter = { _id: req.user.id }
  const update = { password: hashedPassword }

  const updatedUser = await User.findByIdAndUpdate(filter, update, {
    new: true
  }) //update the users password

  res.status(200).json({
    //retrun object
    message: 'Updated Username',
    updatedUser
  })
}) //end updateUsername

//Generate JWT Function
const generateToken = id => {
  //an id, the enviroment variable secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // time to expire
  })
} //end function

//exports
module.exports = {
  registerUser,
  loginUser,
  getMe,
  deleteMe,
  updateUsername,
  updatePassword
}
