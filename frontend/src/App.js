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
import Register from './pages/Register'
import UploadPost from './pages/UploadPost'
import PostPage from './pages/PostPage'

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <Header />
          {/* the first route will be selected by default 
                          localhost:3000/login is the login page etc */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myAccount' element={<MyAccount />} />
            <Route path='/myCollections' element={<MyCollections />} />
            <Route path='/register' element={<Register />} />
            <Route path='/uploadPost' element={<UploadPost />} />
            <Route path='/post/:id' element={<PostPage />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
