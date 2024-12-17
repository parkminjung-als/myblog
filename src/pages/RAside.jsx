import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { boxShadow, padding16 } from '../style/style'
import { RiKakaoTalkFill,  RiInstagramFill , RiFacebookBoxFill, RiTwitterXFill } from "react-icons/ri";

const RAside = () => {

  const facebook = () => {
      window.location.href="https://facebook.com";
  }  
    
  return (
    <>
       <Card style={{ ...boxShadow, ...padding16 }}  className="mb-4">
         <Card.Img variant="top" src="images/me.jpg" />
         <Card.Body>
            <Card.Title>Developer Andrea Lee</Card.Title>
            <Card.Text>
                Hello, I'm Andrea. A Content writer, Developer, and Teacher.
                Working as a Content ...
            </Card.Text>
         </Card.Body>
         <Row>
            <Col md={{span:6, offset:6}}>
                <Link to="about" className="btn btn-outline-success">자세히보기</Link>
            </Col>
         </Row>   
       </Card>

       <Card style={{ ...boxShadow, ...padding16 }} className="mb-4">
          <Card.Title className="text-center">            
            <RiKakaoTalkFill className="mx-2" />
            <RiInstagramFill className="mx-2" />
            <RiFacebookBoxFill className="mx-2" onClick={facebook} />
            <RiTwitterXFill className="mx-2" />
          </Card.Title>
       </Card>

       <Card style={{ ...boxShadow, ...padding16 }} className="mb-4">
          <h4>Category</h4>
          <ul className="list-style">
             <li><Link to="post">posting</Link></li>
             <li><Link to="about">about</Link></li>
             <li><Link to="git">git</Link></li>
             <li><Link to="contact">contact</Link></li>
          </ul>
       </Card>

       <Card style={{ ...boxShadow, ...padding16 }} className="mb-4">해시태그</Card>

    </>
  )
}

export default RAside