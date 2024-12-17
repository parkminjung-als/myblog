import React, { useState, useEffect, useContext } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import CommentWrite from './CommentWrite'
import Login from './Login'
import axios from 'axios'

const View = () => {
  const { post } = useParams();  
  const [ data, setData ] = useState();
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  useEffect(()=>{
     axios.get(`http://localhost:8080/api/posts/${post}`)
          .then(res => { setData(res.data)})
          .catch(error => console.error(error));
  }, [post]);

  if(!data) {
    return <p>로딩중 ... </p>
  }

  return (
    <Container>
       <h3>{data.title}</h3>
       <div dangerouslySetInnerHTML={{__html:data.content}} />
       <br />
      
       {
         isAuthenticated ? <CommentWrite user={user} /> : <Login />
       }
      
    </Container>    
  )
}

export default View