import React from 'react';
import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  getPost,
  
  reset,
} from '../features/posts/postSlice'

function Post({ postId, user, caption, theme, medium, imageURL, comments }) {
  const [newComment, setNewComment] = useState()
  
  // const { user } = useSelector(state => state.auth) // get user
    //don't need already got error from arguments
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const  { // get post inforamtion   
      isError,
      isSuccess,
      isLoading,
      message
    }= useSelector(state => state.post)


  useEffect(() => {
    if(isError){
      toast.error('Couldn\'t add Comment')
    }


  },[])
  


  const onChange = e => {
    setNewComment(e.target.value)
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    toast("submitted comment")
    toast(postId)
    toast(newComment)

    // / have new comment need to dispatchto add it to database

    //need to add some usecase ad other stuff

  }
  

  
  return (
    <div className="post">
      {/* image  this works on dashboard with hard coded inforamtion*/}
      <img className="post__piece"
        src={process.env.PUBLIC_URL + '/uploads/' +imageURL}
        alt={imageURL} 
        width="768" height="520"
        />

      {/* avatar + artist */}
      <div className="post__bottom">
        <Avatar
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
          alt=""
        />

        {/* caption */}
        <h4 className='post__text'><strong>{theme}</strong> - {medium}</h4>
      </div>
        <h3 className='post__text'><strong>{caption}</strong> </h3>
      <div className="post__comments">
        {
          comments.map((comment) => (
            <p>
              -  {comment}
            </p>
          ))
        }
      </div>
      {user && (
        <form className="post__commentBox " onSubmit={onSubmit}>
          <input className="post__input"
            type="text"
            placeholder="Comment your thoughts"
            value={newComment}
            onChange={onChange}
          />
          <button
            className='post__button'
            type="submit"
          >
            Comment
          </button>
        </form>
      )}

    </div>
  )
}

export default Post