import axios from 'axios'

const API_URL = '/api/users/' //Ask what this needs to change to

// Login user
const newName = async userData => {
  const response = await axios.post(API_URL + 'username', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const newPass = async userData => {
    const response = await axios.post(API_URL + 'password', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }

// Delete user
const delUser = () => {
    const response = axios.post(API_URL + 'id')

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