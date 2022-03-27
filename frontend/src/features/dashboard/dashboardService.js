import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = '/api/posts/' // need to include the :id  '/api/posts/678932784732974'

// get all posts
const getAllPosts = async () => {
    const response = await axios.get(API_URL)
    console.log(response.data)
    return response.data
}

const getPostsByTerm = async (data)=>{
    const config = {
        headers: {
          
        }
      }

    const response = await axios.get(API_URL + 'search/'+data.term, data)
    return response.data
}

const PostService = {
    getAllPosts,
    getPostsByTerm
}

export default PostService

