import axios from 'axios'

const API_URL = '/api/posts/' // need to include the :id ????????

// get a post
const getPost = async (postData) => {
 
  const response = await axios.get(API_URL, postData) // ???????????? + postdata.id
  return response.data
}

const PostService = {
    getPost
}
  
export default PostService

