import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import projectStyles from '../modules/myAccount/style.module.css'
import styles from '../modules//myAccount/myAccount.module.css'
import { newName, newPass, deleteAccount } from '../features/change/changeSlice'
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

const MyAccount = (props) => {

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const [nameData, setNameData] = useState('')

  const { name } = nameData

  const [passData, setPassData] = useState({
    pass1: '',
    pass2: ''
  })

  const { pass1, pass2 } = passData

  const nameUpdate = e => {
    setNameData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const passUpdate = e => {
    setPassData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    if (passData.pass1 === passData.pass2) {
      document.getElementById("pass2").className = document.getElementById("pass2").className.replace(" error", "")
    } else {
      document.getElementById("pass2").className = document.getElementById("pass2").className + " error"
    }
  }

  const handleDelete = () => {
    dispatch(deleteAccount())
  }

  const changeName = e => {
    e.preventDefault()

    dispatch(newName(name))
  }

  const changePass = e => {
    e.preventDefault()

    if (pass1 === pass2) {
      dispatch(newPass(pass1))
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
          <p id="message"></p>
          <p className={styles['text']}>Username: { user.username }</p>
          <form onSubmit={changeName}>
            <input
              type="text"
              id="newusername"
              name="newUsername"
              placeholder="New username"
              className={` ${styles['textinput']} ${projectStyles['input']} `}
              onChange={nameUpdate}
            />
            <button
              type="submit"
              name="nameButton"
              className={` ${styles['button']} ${projectStyles['button']} `}
            >
              Change username
            </button>
          </form>
          <form onSubmit={changePass}>
            <input
              type="password"
              id="pass1"
              name="newPassword1"
              placeholder="New password"
              className={` ${styles['textinput1']} ${projectStyles['input']} `}
              onChange={passUpdate}
            />
            <input
              type="password"
              id="pass2"
              name="newPassword2"
              placeholder="Confirm password"
              className={` ${styles['textinput2']} ${projectStyles['input']} `}
              onChange={passUpdate}
            />
            <button
              type="submit"
              name="passwordButton"
              className={` ${styles['button1']} ${projectStyles['button']} `}
            >
              Change password
            </button>
          </form>
      
          <button
            name="deleteButton"
            type="button"
            className={` ${styles['button3']} ${projectStyles['button']} `}
            onClick={() => openModal()}
          >
            DELETE ACCOUNT
          </button>
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
                name="finalDelete"
                className={` ${styles['button4']} ${projectStyles['button']} `}
                type="button"
                onClick={() => handleDelete()}
              >
                DELETE
              </button>
            </div>
          </Modal>
        </div>
      </section>
    </>
    
    
  )
}

export default MyAccount
