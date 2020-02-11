import React, { Component } from 'react';
import { Container , Row , Col , Form , Button, Card} from "react-bootstrap";
import { navigate } from 'gatsby';

import { register, checkLoggedIn } from '../services/auth/AuthService';

export default class Registration extends Component {

    state = {
        name: '',
        phone_no: '',
        email: '',
        password: '',
        confirm_password: '',
        errors: {
            name: '',
        phone_no: '',
        email: '',
        password: '',
        confirm_password: ''
        }
    }

    changeName = (e) => {
        this.setState({name: e.target.value});
    }

    changePhoneNo = (e) => {
        this.setState({ phone_no: e.target.value });
    }

    changeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    changeConfirmPassword = (e) => {
        this.setState({ confirm_password: e.target.value });
    }

    onSubmitRegister = async (e) => {
        e.preventDefault();

        let registerResponse = await register(this.state.name, this.state.phone_no, this.state.email, this.state.password, this.state.confirm_password);
        console.log(registerResponse);

        if(registerResponse.status){
            alert(registerResponse.message);
            navigate('/');
        }else{
            alert(registerResponse.message);
        }
    }

    async componentDidMount() {
        let isLoggedIn = await checkLoggedIn();
        if(isLoggedIn) navigate('/dashboard');
    }

    render() {
        return (
            <div className="login bp">
                <Container>
                    <Row>
                        <Col lg={6} className="listlogin centerbox">
                            <h1>রেজিস্ট্রেশন</h1>                                
                            <Card className="p-3">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                         <Form.Control type="text" placeholder="নাম" onChange={(value) => this.changeName(value)} /> 
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                         <Form.Control type="text" placeholder="ফোন নম্বর" onChange={(value) => this.changePhoneNo(value)} /> 
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                         <Form.Control type="email" placeholder="ইমেইল" onChange={(value) => this.changeEmail(value)} /> 
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                         <Form.Control type="password" placeholder="পাসওয়ার্ড" onChange={(value) => this.changePassword(value)} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                         <Form.Control type="password" placeholder="কনফার্ম পাসওয়ার্ড" onChange={(value) => this.changeConfirmPassword(value)} />
                                    </Form.Group> 
                                    <br/>
                                    <Button variant="primary" type="submit" onClick={(e) => this.onSubmitRegister(e)}>
                                        রেজিস্টার <i className="fas fa-user-plus"></i>
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
