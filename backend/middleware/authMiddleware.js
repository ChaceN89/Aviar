const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");


/**
 * protect using the JWT assigned during login and accout creation
 * Protects routes that include it using JWT
 * checks for presense of token
 * then if token relates to a real id in database
 * 
 */
const protect = asyncHandler( async (req, res, next) => {
    let token  //token
    if(req.headers.authorization &&                      // checking for authorization header
        req.headers.authorization.startsWith('Bearer')){ //making sure its a bearer token
        try {
            //get token from Header (stored beside bearer)
                    //split into array by the space //bearer is first item and tojken is thesecoind item 
            token = req.headers.authorization.split(' ')[1]; // assihgn token 

            //verify the token
            const decoded =jwt.verify(token, process.env.JWT_SECRET); // decoding and verifying the tokenm

            //getting the user from the token
            req.user = await User.findById(decoded.id).select('-password'); // id is in the token
                                                        //don't include password
            next();    //call the next pience of middle ware                                        
        } catch (error) {
            console.log(error); // for console
            res.status(401); // set response
            throw new Error("Access Not Authorized - Token Invlaid");
        }//end try catch
    }
    if(!token){ // probnlem and no token
        res.status(401);
        throw new Error("Access Not Authorized - No Token");
    }

})//end protect

module.exports = { protect };
