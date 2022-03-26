import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = '/api/posts/' // need to include the :id  '/api/posts/678932784732974'

// get a post
const getPost = async (postId) => {
  const response = await axios.get(API_URL + postId) 
  console.log(response.data.imgPath)
  return response.data
}

//add comment to post
const addComment =  async (postId, newComment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const data= {// set comment data
    comment:newComment
  }
    
  const response = await axios.post(API_URL+'comment/'+ postId, data, config) 
  return response.data
}

const PostService = {
    getPost,
    addComment
}
  
export default PostService

