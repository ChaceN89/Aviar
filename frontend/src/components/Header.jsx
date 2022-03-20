//rfce is shorthand to set up basic elements
import React from 'react' // don't need this done automatically

import { FaSignInAlt, FaSignOutAlt, FaUser, FaSearch} from 'react-icons/fa' // icons
import { GrAdd} from 'react-icons/gr' // icons
import { BsPersonPlusFill, BsCardList} from 'react-icons/bs' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
// import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate} from 'react-router-dom' // routing

function Header() {
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const { user } = useSelector((state) => state.auth) // get user

    const onLogout = () => { // logoutfucntion
        // dispatch(logout())  // needed case in reducer
        // dispatch(reset())
        // navigate('/')
    }

  return (
    <header className='header'>
      <div className='logo'>
        Aviar
        {/* <img alt="Logo" src="aviarLogo.png"  />  */}
        {/* <Link to='/'>Aviar</Link> */}
      </div>
      <ul>
        <li>
          <GrAdd/> Add Post
          {/* need to add more so search can work */}
        </li>
        <li>
          <FaSearch/> Search
          {/* need to add more so search can work */}
        </li>
        <li>
          <BsCardList/> My Collection
          {/* need to add more so search can work */}
        </li>
        <li>
          <FaUser/> My Account
          {/* need to add more so search can work */}
        </li>
        
        <li>
          <button className='btn' >
            <FaSignOutAlt /> Logout
          </button>
        </li>
        <li>
          
          <FaSignInAlt /> Login
          
        </li>
        <li>
          <BsPersonPlusFill /> Register
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