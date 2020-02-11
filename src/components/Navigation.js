import React, { Component } from 'react'
import { Link } from "gatsby"
import { Navbar, Nav , Container} from "react-bootstrap"

export default class Navigation extends Component {
    render() {
        return (
            <Navbar expand="lg" id="site-navbar">
            <Container>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                <Link to="/" className="link-no-style">  <Nav.Link as="span" eventKey="">  মূলপাতা </Nav.Link>  </Link>
                <Link to="/signup" className="link-no-style">  <Nav.Link as="span" eventKey=""> রেজিস্ট্রেশন </Nav.Link>  </Link>
                <Link to="/signin" className="link-no-style">  <Nav.Link as="span" eventKey="">  লগইন </Nav.Link>  </Link>
                <Link to="/leaderboard" className="link-no-style">  <Nav.Link as="span" eventKey="">  লিডারবোর্ড </Nav.Link>  </Link>
                <Link to="/rules" className="link-no-style">  <Nav.Link as="span" eventKey="">  নিয়মাবলী </Nav.Link>  </Link>

              </Nav> 
            </Navbar.Collapse>

            </Container>
          </Navbar>
        )
    }
}
