const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    //id is created automatically
    user:{ // every goal is associated with a specific user
        type: mongoose.Schema.Types.ObjectId, //id field will lead to this, this type is an object id
        requiered: true,  // this is requiered
        ref: "User"   // reference to a model of User
    },
    imgPath:{
        type:String,
        requiered: true,  // this is requiered
    },
    caption:{
        type:String,
        requiered: true,
    },
    comments:[{ // array of posts
        type:String,
        required:false,
    }], // array of user post ids
    ratings:[{ type:Number,}], // array of ratings
    rating:{type:Number},
    numLikes:{type:Number,}, // array of likes
    theme:{type:String},
    medium:{type:String},
    tags:[{ type:String,}],
           
},{
    timestamps :true // automatically creates time stamps for updated and created
}); //end userSchema

module.exports = mongoose.model("Post", postSchema); //export userSchema as User

