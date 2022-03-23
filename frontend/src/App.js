import React from 'react';
// import logo from './logo.svg'; don't need but for knowing how to get a logo

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


//component imports
import Header from './components/Header'

//page imports
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import MyAccount from './pages/MyAccount'
import MyCollections from './pages/MyCollections'
import Post from './pages/Post'
import Register from './pages/Register'
import UploadPost from './pages/UploadPost'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <h1> My App - Aviar</h1>
          <p>This section will not be in finsihed product</p>
          <p>not all nav bar elements will be on the screen at same time</p>
          <p>Logo can be added to header on far left of header</p>
          <br />
          <hr />
          <br />
          {/* the first route will be selected by default 
                          localhost:3000/login is the login page etc */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myAccount' element={<MyAccount />} />
            <Route path='/myCollections' element={<MyCollections />} />
            <Route path='/post' element={<Post />} />
            <Route path='/register' element={<Register />} />
            <Route path='/uploadPost' element={<UploadPost />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
