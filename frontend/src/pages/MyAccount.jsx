import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import Modal from 'react-modal'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import projectStyles from '../modules/myAccount/style.module.css'
import styles from '../modules//myAccount/myAccount.module.css'
import { newName, newPass, deleteAccount } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px'
  }
}

const MyAccount = props => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      dispatch(reset())
      navigate('/')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  })

  const { username, password, password2 } = formData

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleDelete = () => {
    dispatch(deleteAccount())
    dispatch(reset())
    navigate('/')
    toast.success('Account has been deleted')
  }

  const changeName = e => {
    e.preventDefault()

    const name = { username }

    dispatch(newName(name))

    setFormData({ username: '' })
    toast.success('Username successfully changed')
  }

  const changePass = e => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const pass = { password }

      dispatch(newPass(pass))
      setFormData({ password: '', password2: '' })
      toast.success('Password successfully changed')
    }
  }

  // setup modal
  const [modalIsOpen, setModalState] = useState(false)

  function openModal () {
    setModalState(true)
  }

  function closeModal () {
    setModalState(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      <section className='heading' style={{ marginTop: '15px' }}>
        <h1>
          <FaUser /> My Account
        </h1>
        <p>Change your account information</p>
      </section>

      <section className='form'>
        <p id='message'></p>
        <label for='username'>
          Current username: <strong>{user.username}</strong>
        </label>
        <form onSubmit={changeName}>
          <div className='form-group'>
            <input
              className='textGradient'
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='New username'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' name='nameButton' className='btn btn-block'>
              Change username
            </button>
          </div>
        </form>

        <form onSubmit={changePass}>
          <div className='form-group'>
            <input
              className='textGradient'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='New password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              className='textGradient'
              type='password'
              id='password'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button
              type='submit'
              name='passwordButton'
              className='btn btn-block'
            >
              Change password
            </button>
          </div>
        </form>

        <div onClick={e => e.stopPropagation()}>
          <button
            name='deleteButton'
            type='button'
            className='btn'
            onClick={() => openModal()}
            style={{
              float: 'right',
              backgroundColor: '#E23636',
              border: '0px'
            }}
          >
            DELETE ACCOUNT
          </button>
          <div onClick={e => e.stopPropagation()}>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              ariaHideApp={false}
              style={modalStyle}
            >
              <div className='modal' style={{ textAlign: 'center' }}>
                <h4>Are you sure you want to delete your account?</h4>
                <button onClick={closeModal} className='close'>
                  X
                </button>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'nowrap'
                  }}
                >
                  <button
                    className='btn btn-box'
                    style={{
                      margin: '10px',
                      background: '#E6E6E6',
                      color: '#000'
                    }}
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <button
                    className='btn btn-box'
                    style={{ margin: '10px' }}
                    onClick={closeModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyAccount
