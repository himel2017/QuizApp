import React, { Component, useEffect } from 'react';
import { Container , Row , Col , Form , Button, Card , Tabs , Tab} from "react-bootstrap";
import { navigate } from 'gatsby';

import { login, checkLoggedIn } from '../services/auth/AuthService';

export default class Login extends Component {

    state = {
        phone_no : '',
        password : '',
        errors: {
            phone_no : '',
            password : ''
        }
    }

    changePhoneNo = (e) => {
        this.setState({ phone_no: e.target.value });
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onSubmitLogin = async (e) => {
        e.preventDefault();

        let loginResponse = await login(this.state.phone_no, this.state.password);
        console.log(loginResponse);

        if(loginResponse.status){
            // alert(loginResponse.message);
            navigate('/dashboard');
        }else{
            alert(loginResponse.message);
        }
    }

    async componentDidMount() {
        let isLoggedIn = await checkLoggedIn();
        if(isLoggedIn) navigate('/');
    }
    

    render() {
        return (
            <div className="login mylogin bp">
                <Container>
                    <Row>
                        <Col lg={5} className="listlogin centerbox">
                            <h1>লগইন</h1>
                            <Card className="p-3">

                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                         <Form.Control type="email" placeholder="ফোন নম্বর" onChange={(value) => this.changePhoneNo(value)}/> 
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                         <Form.Control type="password" placeholder="পাসওয়ার্ড" onChange={(value) => this.changePassword(value)}/>
                                    </Form.Group>
                                    
                                    <Button variant="primary" type="submit" onClick={(e) => this.onSubmitLogin(e)}>
                                        লগইন <i className="fas fa-sign-in-alt"></i>
                                    </Button>
                                    
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
