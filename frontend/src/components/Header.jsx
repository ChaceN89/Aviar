//rfce is shorthand to set up basic elements
import React from 'react' // don't need this done automatically

import { FaSignInAlt, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa' // icons
import { GrAdd } from 'react-icons/gr' // icons
import { BsPersonPlusFill, BsCardList } from 'react-icons/bs' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom' // routing

function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth) // get user

  const onLogout = () => {
    // logout function
    dispatch(logout()) // needed case in reducer
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Aviar</Link>

        {/* can add logo here */}
        {/* <img alt="Logo" src="aviarLogo.png"  />  */}
      </div>
      <ul>
        <li>
          <Link to='/uploadPost'>
            <GrAdd /> Add Post
          </Link>
        </li>
        <li>
          {/* needs functionality to finsih search  */}
          <FaSearch /> Search
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
          <Link to='/home'>
            <FaUser /> H
          </Link>
        </li>

        <li>
          <button className='btn' onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
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
      </ul>
    </header>
  ) // end return
}

export default Header

/**
 
<header className='header'>
      <div className='logo'>
        <Link to='/'>Aviar</Link>
      </div>
      <ul>
        {user ? (  // like if statements   user already signed in
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : ( // else
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>


 */
