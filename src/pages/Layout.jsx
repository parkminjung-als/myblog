import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Top from './Top'
import RAside from './RAside'
import Footer from './Footer'

const Layout = () => {
  return (
      <>
        <Top />
        <Container>
          <Row className="pt-4">
          <Col md="9"><Outlet /></Col>
          <Col md="3"><RAside /></Col>
          </Row>
        </Container>
        <Footer />
      </>
  )
}

export default Layout