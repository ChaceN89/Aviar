import React from 'react';
import { Avatar } from '@material-ui/core';

function Post({ postId, creator, user, statement, imageURL }) {
  return (
    <div className="post">
      {/* image */}
      <img className="post__piece"
        src={imageURL}
        alt={imageURL} />

      {/* avatar + artist */}
      <div className="post__bottom">
        <Avatar
          className="post__avatar"
          alt={creator}
          src="/static/images/avatar/1.jpg"
        />

        {/* caption */}
        <h4 className='post__text'><strong>{creator}</strong> {statement}</h4>
      </div>
      <div className="post__comments">
        {/* {
          comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))
        } */}
      </div>
      {user && (
        <form className="post__commentBox">
          <input className="post__input"
            type="text"
            placeholder="Share a few words"
          // value={comment}
          // onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post__button'
            // disabled={!comment}
            type="submit"
          // onClick={postComment}
          >
            Post
          </button>
        </form>
      )}

    </div>
  )
}

export default Post