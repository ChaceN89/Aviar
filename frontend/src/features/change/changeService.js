import axios from 'axios'

const API_URL = '/api/users/'

// Change username
const newName = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + 'username', username, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  response.data.token = token

  return response.data
}

// Change password
const newPass = async (password, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + 'password', password, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  response.data.token = token

  return response.data
}

// Delete user
const delUser = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = axios.delete(API_URL, config)

  if (response.data) {
    localStorage.removeItem('user')
  }

  return response.data
}

const changeService = {
  newName,
  newPass,
  delUser
}

export default changeService
