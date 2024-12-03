import React, {useState}from 'react'
import {Link} from 'react-router-dom'
import{ Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Search from '../components/Search';

const Top = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleMouseEnter = () => setShowDropdown(true);
    const handleMouseLeave = () => setShowDropdown(false);
  return (
    <header className="navigation">
        <Navbar expand="lg" className="bg-white-transparent">
            <Container>
                <Navbar.Brand as={Link} to="/"><img src="./images/logo.svg" className="img-logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-md-5 me-auto">
                <Search />
                <NavDropdown 
                    title="category" 
                    id="basic-nav-dropdown"
                    show={showDropdown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={showDropdown?'dropv':''}
                    >
                    <NavDropdown.Item as={Link} to="post/여행">Action</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="post/스포츠">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="post/취미">Something</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item as={Link} to="post/코딩">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="about">about</Nav.Link>
                    <Nav.Link as={Link} to="github">mygithub</Nav.Link>
                    <Nav.Link as={Link} to="contact">contact</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Top