import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { boxShadow, padding16, borders } from '../style/style'
import Banner from '../components/Banner'
import { FcLike, FcApproval , FcCalendar } from "react-icons/fc";
import axios from 'axios'

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get('/api/posts')
         .then(response => {
            setPosts(response.data);
         })
         .catch(error=>console.error(error));
  },[]);
 
  //이미지 태그 제거 함수
  const removeImgTags = (content) => {
     return content.replace(/<img[^>]*>/g, '');
  };

  /*
    yyyy 연도,  MM 월, dd 일, EEEE 요일(간략히 하려면 E), a(오전/오후) h:m (시간, 분)
  */
  const formatDate = (dt) => {
     const date = new Date(dt);
     return format(date, "yyyy년 MM월 dd일 EEEE a h:m", { locale: ko });
  }


  return (
    <Container style={{...boxShadow, ...padding16, ...borders}}>
       <Row className="mt-4">
        {
            posts.map((post , index)=> (
               <Col md="12" key={index}>
                  {
                    post.firstImg && (
                       <Link to={`/view/${post.post}`}><Image src={`upload/images/${post.ntime}/${post.firstImg}`} className="post-img" alt={post.title} /></Link>
                    )
                  }
                  <div className="post-text-box">
                     <div className="post-event">
                        <span className="bold mx-4"> <FcLike/> {post.empathy} </span>
                        <span className="bold text-danger mx-4"><FcApproval /> {post.hit}</span>
                        <span className="ps-4"> <FcCalendar /> {formatDate(post.createDate)} </span>
                     </div>
                     <h3><Link to={`/view/${post.post}`}>{post.title}</Link></h3>
                     <div dangerouslySetInnerHTML={{ __html: removeImgTags(post.content)}} />
                  </div>
               </Col>
            ))
        }
       </Row>
    </Container>
  )
}

export default Post