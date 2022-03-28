import React from 'react'
import { Avatar } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { addComment, reset } from '../features/posts/postSlice'

function Post ({
  postId,
  user,
  caption,
  theme,
  medium,
  imageURL,
  comments,
  context
}) {
  const [newComment, setNewComment] = useState()

  // const { user } = useSelector(state => state.auth) // get user
  //don't need already got error from arguments
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    // get post status inforamtion
    isError,
    commentAdded,
    isSuccess,
    isLoading,
    message
  } = useSelector(state => state.post)

  useEffect(() => {
    if (commentAdded) {
      // if the comemnt is added
      window.location.reload() // refresh the page
    }

    if (isError && isSuccess) {
      // error with comment and there is a post to comment on
      toast.error("Couldn't add Comment")
    }

    return () => {
      // might not be able to call this reset
      // dispatch(reset()) // refresh will take can of reset in
      //PostPage
    }
  }, [isError, dispatch, commentAdded])

  const onChange = e => {
    setNewComment(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()

    //need post data
    const formData = new FormData() // set form data
    formData.append('postId', postId)
    formData.append('newComment', newComment)

    dispatch(
      addComment({
        postId: postId,
        newComment: newComment
      })
    )
  }

  // does this on the page calling it
  // if (isLoading) { // this might cause an error if post doens't exisit not sure why but its hjsut for show so its not nessaesary
  //   return <Spinner />
  // }

  return (
    <div
      className='post'
      style={{
        marginBottom: context === 'page' ? '20px' : null,
        marginTop: context === 'page' ? '40px' : null
      }}
    >
      {/* image  this works on dashboard with hard coded inforamtion*/}
      {context === 'page' ? (
        <img
          className='post__piece'
          src={process.env.PUBLIC_URL + '/uploads/' + imageURL}
          alt={imageURL}
          width='768'
          height='520'
        />
      ) : (
        <Link to={'/post/' + postId}>
          <img
            className='post__piece'
            src={process.env.PUBLIC_URL + '/uploads/' + imageURL}
            alt={imageURL}
            width='768'
            height='520'
          />
        </Link>
      )}

      {/* avatar + artist */}
      <div className='post__bottom'>
        <Avatar
          className='post__avatar'
          src='/static/images/avatar/1.jpg'
          alt=''
        />

        {/* caption */}
        <h4 className='post__text'>
          <strong>{theme}</strong> - {medium}
        </h4>
      </div>
      <h3 className='post__text'>
        <strong>{caption}</strong>{' '}
      </h3>
      <div className='post__comments'>
        {comments.map(comment => (
          <p>- {comment}</p>
        ))}
      </div>
      {user && ( // if user then comment is available
        <form className='post__commentBox ' onSubmit={onSubmit}>
          <input
            className='post__input'
            type='text'
            placeholder='Comment your thoughts'
            value={newComment}
            onChange={onChange}
          />
          <button className='post__button' type='submit'>
            Comment
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
