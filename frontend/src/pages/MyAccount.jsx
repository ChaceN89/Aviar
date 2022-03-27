import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import Modal from 'react-modal'
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
    transform: 'translate(-50%, -50%)'
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
  }

  const changeName = e => {
    e.preventDefault()

    const name = { username }

    dispatch(newName(name))
  }

  const changePass = e => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const pass = { password }

      dispatch(newPass(pass))
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
    <>
      <section>
        <div className={styles['container']}>
          <p id='message'></p>
          <p className={styles['text']}>Username: {user.username}</p>
          <form onSubmit={changeName}>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='New username'
              className={` ${styles['textinput']} ${projectStyles['input']} `}
              onChange={onChange}
            />
            <button
              type='submit'
              name='nameButton'
              className={` ${styles['button']} ${projectStyles['button']} `}
            >
              Change username
            </button>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='New password'
              className={` ${styles['textinput1']} ${projectStyles['input']} `}
              onChange={onChange}
            />
            <input
              type='password'
              id='password'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              className={` ${styles['textinput2']} ${projectStyles['input']} `}
              onChange={onChange}
            />
            <button
              name='passwordButton'
              className={` ${styles['button1']} ${projectStyles['button']} `}
              onClick={changePass}
            >
              Change password
            </button>
          </form>

          <div onClick={e => e.stopPropagation()}>
            <button
              name='deleteButton'
              type='button'
              className={` ${styles['button3']} ${projectStyles['button']} `}
              onClick={() => openModal()}
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
                <div className='modal'>
                  <p>Are you sure? This cannot be undone</p>
                  <button onClick={() => closeModal()} className='close'>
                    X
                  </button>
                  <hr style={{ marginBottom: '10px' }} />

                  <button
                    name='finalDelete'
                    className={` ${styles['button4']} ${projectStyles['button']} `}
                    type='button'
                    onClick={handleDelete}
                  >
                    DELETE
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyAccount
