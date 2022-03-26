import React from 'react'
import { useParams } from "react-router-dom";


//takes /post/:id

function PostPage() {
  //get post id
  const {id} = useParams()

  
  // //need to get post information
  
  // need to get information of post


  return (
    <>
    <div>postPage Post - {JSON.stringify(id)} </div>
    <h1>Post number to get - {id}</h1>
    </>
  )
}

export default PostPage