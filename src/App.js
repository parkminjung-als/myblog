import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import AnimatedCursor from "react-animated-cursor"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login'

import Layout from './pages/Layout'
import Main from './pages/Main'
import Post from './pages/Post';
import About from './pages/About';
import Contact from './pages/Contact';
import Git from './pages/Git';
import View from './pages/View';


import { AuthProvider, AuthContext } from './context/AuthContext'

/** 관리자 */
import PostWrite from './pages/admin/PostWrite';

/** 인증 상태에 따라 라우팅 제어 */
const PrivateRoute = ({ children, adminOnly = false })=> {
   const { isAuthenticated, user} = useContext( AuthContext );

   if(!isAuthenticated) {  //로그인 안되어 있으면 로그인 페이지
       return <Navigate to="/login" replace />;
   }

   if(adminOnly && user.role === 'admin') {
      return <Navigate to="/" replace />;
   }

   return children;
}


const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AnimatedCursor />
        <Router>
              <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="post" element={<Post />} />
                    <Route path="about" element={<About />} />
                    <Route path="git" element={<Git />}/>
                    <Route path="contact" element={<Contact />} />
                    <Route path="view/:post" element={<View />} />
                    <Route path="login" element={<Login />} />
                    <Route path="postwrite" element={
                      <PrivateRoute adminOnly={true}>
                        <PostWrite />
                      </PrivateRoute> 
                    } />
                  </Route>
              </Routes>

        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>    
  )
}

export default App