import axios from 'axios'

const API_URL = '/api/users/' //Ask what this needs to change to

// Change username
const newName = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + 'username', config, username)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Change password
const newPass = async (password, token) => {
    const response = await axios.put(API_URL + 'password', token, password)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }

// Delete user
const delUser = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = axios.delete(API_URL + 'id', config)

  if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
  }
  
  return response.data
}

const changeService = {
  newName,
  newPass,
  delUser
}

export default changeService
