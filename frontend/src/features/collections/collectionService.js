import axios from 'axios'

const API_URL = '/api/collections/'

// Get user's collections
const getCollections = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const updateCollectionName = async (colId, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + colId, name, config)

  return response.data
}

const deleteCollection = async (colId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + colId, config)

  return response.data
}

const addPostToCollection = async (postId, colId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const postObj = { postId }

  const response = await axios.post(API_URL + 'post/' + colId, postObj, config)

  return response.data
}

const removePostFromCollection = async (postId, colId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios({
    method: 'delete',
    url: API_URL + 'post/' + colId,
    data: {
      postId: postId
    },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

const createCollection = async (postId, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const nameObj = { name }

  const response = await axios.post(API_URL + postId, nameObj, config)

  return response.data
}

const collectionService = {
  getCollections,
  updateCollectionName,
  deleteCollection,
  addPostToCollection,
  removePostFromCollection,
  createCollection
}

export default collectionService
