import axios from 'axios'

const API_URL = '/api/posts/' // need to include the :id  '/api/posts/678932784732974'

// get all posts
const getAllPosts = async () => {
    const response = await axios.get(API_URL)
    console.log(response.data)
    return response.data
}

const PostService = {
    getAllPosts
}

export default PostService

