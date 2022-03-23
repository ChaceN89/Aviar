//rfce is shorthand to set up basic elements
import React from 'react' // don't need this done automatically

import { FaSignInAlt, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa' // icons
import { GrAdd } from 'react-icons/gr' // icons
import { BsPersonPlusFill, BsCardList } from 'react-icons/bs' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom' // routing
import Spinner from '../components/Spinner'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'


function Header () {
  const [formData, setFormData] = useState({
    search: '',
  })

  const { search  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth) // get before adding search


  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )
  
  //doens't really do much yet - need to make another fucntion
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    if (isSuccess || user) {
      navigate('/')
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  

  const onSubmit = e => {
    e.preventDefault()

    const userData = {
      search
    }


    // probbaly set a local storage variable and use it in dashboard
    

    toast.error("Searched for " +search)

    // dispatch( search function using userData)
  }


  const onLogout = () => {
    // logout function
    dispatch(logout()) // needed case in reducer
    dispatch(reset())
    navigate('/')
  }
  
  if (isLoading) {
    return <Spinner />
  }


  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Aviar</Link>

        {/* can add logo here */}
        {/* <img alt="Logo" src="aviarLogo.png"  />  */}
      </div>
      <ul>
      
        {user ? ( 
          <>
          <li>
            <Link to='/uploadPost'>
              <GrAdd /> Add Post
            </Link>
          </li>
          <li>

 
          
          <form onSubmit={onSubmit}>
            <div >
              <button className='search_symbol' type='submit' >
                <FaSearch /> 
              </button >
              <input 
                className='search'
                type='search'
                id='search'
                name='search'
                value={search}
                placeholder='Search...'
                onChange={onChange}
              />

            </div>
          </form>


          </li>
          <li>
            <Link to='/myCollections'>
              <BsCardList /> My Collections
            </Link>
          </li>
          <li>
            <Link to='/myAccount'>
              <FaUser /> My Account
            </Link>
          </li>
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>


          </>
        ):(
          <>
          <li>
            <Link to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <BsPersonPlusFill /> Register
            </Link>
          </li> 
          </>
        ) }


        
        </ul>
    </header>
  ) // end return
}

export default Header
