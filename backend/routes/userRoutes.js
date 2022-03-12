//user routes
const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser,
    getMe, 

} = require('../controllers/userController');
 
const {protect} = require('../middleware/authMiddleware'); // to make routes private (need JWT)

//registering a user 
router.post('/', registerUser); //should be public

//login to a user 
router.post('/login', loginUser); //should be public

//get current user information
router.get('/me', protect, getMe); // private/protected


module.exports = router ; // export the router
