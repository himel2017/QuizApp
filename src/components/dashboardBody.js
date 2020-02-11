import React, { Component } from 'react';
import { Container, Row, Col, Button} from "react-bootstrap";
import dummy from '../images/dummy.png';
import { navigate, Link } from 'gatsby';

export default class DashboardBody extends Component {
    render() {
        return (
            
            <div className="bodyArea">
            <Container>
                <Row className="bodyCenter">
                    <Col lg={5}>
                       <div className="BanglaWrite">
                           <h2>বাংলা লিখি বাংলায় </h2>
                           <p>ভুলভাল ইংরেজি অক্ষরে বিকৃত বাংলা লিখে আমরা প্রতিনিয়ত আমাদেরকে হাস্যকর করে তুলছি আর গর্বের বাংলা ভাষার সম্মানকে করছি ভূলুণ্ঠিত। 
                               চলো বাংলা লেখার এ বিকৃতি বন্ধ করে এবার বাংলা লিখি বাংলায়।</p>
                           <Button onClick={() => navigate('/quiz')}> টাইপিং টেস্ট শুরু করুন  </Button>
                       </div>
                    </Col>
                    <Col lg={7}>
                       <div className="brandImageBox">
                           <img src={dummy} />
                       </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
