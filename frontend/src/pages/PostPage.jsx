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
    <div>PostPage</div>
    
    {isSuccess ?( // post has been found
      <>
        
        {/* // not sure is this is going to work */}
  <Post key={post.id} postId={post.id} user={user.id} 
  creator={user.username} statement={post.caption} imageURL={post.imgPath} />

        {/* general inforamtion for post to use after formating css and stuff */}

        <h2>Got Post</h2>
        <h5>Just need to format the post</h5>
        <p>the Post component has a lot of fields we aren't using so im not sure how its going to work</p>
        <h5>Signed in {user.username}- {user._id}</h5>
        <h4>Post id - {post._id} // imgPath -{post.imgPath}</h4>
        <h5>Caption: {post.caption}</h5>
        <h5>Theme: {post.theme}</h5>
        <h5>Medium: {post.medium}</h5>
        <img src={process.env.PUBLIC_URL + '/uploads/' +post.imgPath} alt={post.imgPath} ></img>
       
      </>
    ):(
      <>
      {/* can't find the post so display this */}
      <h1>Post <small><small> {id} </small></small>  Not Found!!</h1>
      <h3>Looks like your trying to access a resource that no longer exists</h3>
      </>
    )}
    </>
  )
}

export default PostPage