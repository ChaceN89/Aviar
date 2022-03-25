import axios from 'axios'

const API_URL = '/api/posts/'

// uploadPost user
const uploadPost = async (postData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // I don't think this is nessasary
    }
  }
  const response = await axios.post(API_URL, postData, config)
  return response.data
}

const uploadPostsService = {
  uploadPost
}
  
export default uploadPostsService

