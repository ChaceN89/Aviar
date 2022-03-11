const mongoose = require('mongoose');

// internal schema used by userSchema
const collectionSchema = mongoose.Schema({ // schema for a individual collection
    collectionName:{ // a collection
        type:String, 
        requiered:[true, "Please add a collection title"]
    },
    PostList:[{ // array of posts
        type:mongoose.Schema.Types.ObjectId,
        requiered:false,
        ref: "Post"   // reference to a model of Post
        }
    ],
})

const userSchema = mongoose.Schema({
    //id is created automatically
    name:{
        type:String,
        requiered:[true, "Please add name"]
    },

    password:{
        type:String,
        requiered:[true, "Please add a password"]
    },

    userPosts:[{ // array of posts
        type:mongoose.Schema.Types.ObjectId,
        requiered:false,
        ref: "Post"   // reference to a model of Post
        }
    ], // array of user post ids
    
    //could add liked posts in here if we want
   
    savedPosts:[ collectionSchema ] // saved posts is array of 
           
},{
    timestamps :true // automatically creates time stamps for updated and created
});

module.exports = mongoose.model("User", userSchema); //export userSchema as User