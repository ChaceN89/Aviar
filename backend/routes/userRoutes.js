//user routes
const express = require('express');
const router = express.Router();
const { 
    registerUser, 

} = require('../controllers/userController');
 
// const {protect} = require('../middleware/authMiddleware'); // for later

//adding a user
router.post('/', registerUser); //create a user

//login

module.exports = router ; // export the router