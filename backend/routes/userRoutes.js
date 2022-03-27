//user routes
const express = require('express') // get express
const router = express.Router() // set up express router
const {
  //import functions from usercontroller
  registerUser,
  loginUser,
  getMe,
  deleteMe,
  updateUsername,
  updatePassword
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware') // to make routes private (need JWT)
//registering a user
router.post('/', registerUser) //should be public
//login to a user
router.post('/login', loginUser) //should be public
//get current user information
router.get('/me', protect, getMe) // private/protected
//delete current user
router.delete('/', protect, deleteMe) // private/protected
//update current username
router.put('/username', protect, updateUsername) // private/protected
//update current username
router.put('/password', protect, updatePassword) // private/protected

//collection

module.exports = router // export the router
