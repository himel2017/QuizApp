import React, { Component } from 'react';
import { Navbar, Nav , Container, Button} from "react-bootstrap";
import { logout } from '../services/auth/AuthService';
import { navigate, Link } from 'gatsby';
import Countup from './Countup';
import { getCertificate } from '../services/quiz/QuestionService';

export default class Menu extends Component {

  state = {
    played_once : false
  }

  async componentDidMount() {
    let certificateResponse = await getCertificate();

    if(certificateResponse != null){
      this.setState({played_once: true});
    }
  }

  onSubmitLogout = async (e) => {
    e.preventDefault();

    let logoutResponse = await logout();
    console.log(logoutResponse);
  }

    render() {
        return (
            <Navbar expand="lg" id="site-navbar">
            <Container>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

            {/* <Timer>
              <Countup/>
            </Timer> */}

              <Link to="/dashboard" className="link-no-style">  <Nav.Link as="span" eventKey=""> মূলপাতা </Nav.Link>  </Link>

              {/* <Button variant="primary" type="submit" onClick={() => navigate('/quiz')} className="mr-2">
               টেস্ট শুরু করুন 
              </Button>   */}

              {
                this.state.played_once &&
                <Link to="/certificate" className="link-no-style">  <Nav.Link as="span" eventKey="">  সনদপত্র </Nav.Link>  </Link>

              }

              <Button className="buttonstyle" type="submit" onClick={(e) => this.onSubmitLogout(e)}>
                  লগআউট <i className="fas fa-sign-in-alt"></i>
              </Button>

              </Nav> 
            </Navbar.Collapse>

            </Container>
          </Navbar>
        )
    }
}
