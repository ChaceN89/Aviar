import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getPost, reset } from '../features/posts/postSlice'
import { toast } from 'react-toastify'
import Post from '../components/Post'
import Fade from 'react-reveal/Fade'

import AddToCollection from '../components/AddToCollection'

function PostPage () {
  //get post id
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth) // get user

  const {
    // get post inforamtion
    post,
    isError,
    isSuccess,
    isLoading,
    message
  } = useSelector(state => state.post)

  useEffect(() => {
    if (isError) {
      // don't really need this since teh html show psot not found if it isn't there
      // console
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(
      getPost({
        id: id
      })
    )

    return () => {
      dispatch(reset())
    }
  }, []) // only one time

  if (isLoading) {
    // this might cause an error if post doens't exisit not sure why but its hjsut for show so its not nessaesary
    return <Spinner />
  }

  //also need to

  //probbaly need an add to colelction component

  return (
    <>
      {isSuccess ? ( // post has been found
        //tools to display add to collection options
        <>
          <AddToCollection postId={id} user={user} post={post} />
          <br />

          {/* display the post */}
          <Post
            key={id}
            postId={post._id}
            user={user}
            caption={post.caption}
            medium={post.medium}
            theme={post.theme}
            imageURL={post.imgPath}
            comments={post.comments}
            context='page'
          />
          <hr style={{ marginTop: '75px' }} />
        </>
      ) : (
        <>
          {/* can't find the post so display this */}
          <h1>Post</h1> <small> {id} </small> <h1>Not Found!</h1>
          <h3>
            Looks like your trying to access a resource that may not be
            available
          </h3>
        </>
      )}
    </>
  )
}

export default PostPage
