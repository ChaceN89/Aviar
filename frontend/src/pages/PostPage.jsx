import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import {
  getPost,
  reset,
} from '../features/posts/postSlice'
import { toast } from 'react-toastify';
import Post from '../components/Post'
import Fade from 'react-reveal/Fade';

function PostPage() {
//get post id
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth) // get user

  const  { // get post inforamtion 
    post,  
    isError,
    isSuccess,
    isLoading,
    message
  }= useSelector(state => state.post)

  useEffect(() =>{
    if (isError) { // don't really need this since teh html show psot not found if it isn't there
      // console
    }
    
    if (!user) {
      navigate('/login')
    }

    dispatch(getPost({
      id:id
      })
    )

      //for testing
     // id:id                                //works
        // id:'623eada98485221571014321 _ '  // doens't work
        // id:'623eada98485221571014321'     // works
        // id:'623eab003b4cdd233f609bd7'     // works

    // if(isSuccess){ // same as having a post
    //   // toast("got post")
    // }

    return () => {
      dispatch(reset())
    }

  },[user, isError, navigate, dispatch])
  // [ user, isSuccess, isError,  navigate, dispatch])


  
  // if (isLoading) { // this might cause an error if post doens't exisit not sure why but its hjsut for show so its not nessaesary 
  //   return <Spinner />
  // }


    // test path statements
    // const path = process.env.PUBLIC_URL + '/favicon.ico' 
    // const path2 = process.env.PUBLIC_URL + '/uploads/' +post.imgPath


  return (
    <>
    
    {post ?( // post has been found
      <>
      {/* display the post */}
        <Post key={id} postId={post._id} user={user} 
          caption={post.caption} medium={post.medium} 
          theme={post.theme} imageURL={post.imgPath} comments={post.comments} 
        />
        <br /><br /><br /><br />
        
      </>
    ):(
      <>
      {/* can't find the post so display this */}
      <h1>Post</h1> <small> {id} </small>  <h1>Not Found!</h1>
      <h3>Looks like your trying to access a resource that no longer exists</h3>
      </>
    )}
    </>
  )
}

export default PostPage