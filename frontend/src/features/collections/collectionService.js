import axios from 'axios'

const API_URL = '/api/collections/'

// Get user's collections
const getCollections = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + 'collections', config)

  return response.data
}

const collectionService = {
  getCollections
}

export default collectionService
