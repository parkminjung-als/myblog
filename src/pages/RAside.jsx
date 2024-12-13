import React from 'react'
import { Card, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {boxShadow, padding16} from '../style/style'
import { RiInstagramLine, RiGithubFill } from "react-icons/ri";

const RAside = () => {

    const instagram = () => {
        window.location.href="https://instagram.com";
    }
    const github = () => {
        window.location.href="https://github.com";
    }
  return (
    <>
    <Card style={ {...boxShadow, ...padding16}} className="mb-4">
        <Card.Body>
            <Card.Img variant='top' src='images/me.jpg' />Developer MJ-Park
            <Card.Text>
                Hello, I'm MJ-Park. A Content writer, Developer.
                Working as a Content.
            </Card.Text>
        </Card.Body>
        <Row>
            <Col md={{span:6, offset:6}}>
                <Link to="about" className="btn btn-outline-success">자세히 보기</Link>
            </Col>
        </Row>
    </Card>
    <Card style={ {...boxShadow, ...padding16}} className="mb-4">
        <Card.Title className="text-center">
        <RiInstagramLine className="mx-2" onClick={instagram} />
        <RiGithubFill className="mx-2" onClick={github}/>
        </Card.Title>
    
    </Card>
    <Card style={ {...boxShadow, ...padding16}} className="mb-4">
        <h4>Category</h4>
        <ul className="list-style">
            <li><Link to="post">posting</Link></li>
            <li><Link to="about">about</Link></li>
            <li><Link to="git">git</Link></li>
            <li><Link to="contact">contact</Link></li>
        </ul>
    </Card>
    <Card style={ {...boxShadow, ...padding16}} className="mb-4">해시태그</Card>
    </>
  )
}

export default RAside