import React from 'react'


function AddToCollection({ postId, user, post }) {
    const collections = false; // test for 
            //this will be a determination of failure or success for getting users colelctionss
  
        //functionality to get collections 


    return (
    <>
    {collections ?(
        <>
         
        <div>add to Collection 1</div>
        <div>add to Collection 2</div>

        </>


    ):(
        <>
        <div>create a collection</div>

        </>

    )}
    <br />
    <div>AddToCollection </div>
    <div>Post to add is: {postId}</div>
    <div>Post to add is: {post._id}</div>
    <div>Post img is: {post.imgPath}</div>
    <div>User is: {user.username}</div>
    </>
  )
}

export default AddToCollection