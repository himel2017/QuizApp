import React, { Component } from 'react';
import { navigate, Link } from 'gatsby';

import { checkLoggedIn } from '../services/auth/AuthService';
import Menu from '../components/Menu';
import Certificate from '../components/Certificate';
import { getCertificate } from '../services/quiz/QuestionService';
import Navigation from '../components/Navigation';
import { Container, Row, Col} from "react-bootstrap";
import speedbang from '../images/sppedimg.png';
import win from '../images/win.png';
import { getSeconds, getMinutes } from '../services/Utils/TimeHelper';
import { Helmet } from "react-helmet";

export default class certificate extends Component {

  // async componentDidMount() {
  //   let isLoggedIn = await checkLoggedIn();
  //   if(!isLoggedIn) navigate('/signin');
  // }

  state = {
    name : '_____',
    date : '_____',
    time : '_____',
    slug : '',
    played_once : false
  }

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(!isLoggedIn) navigate('/signin');

    let certificateResponse = await getCertificate();

    if(certificateResponse != null){
      this.setState({name: certificateResponse['name']});
      this.setState({date: certificateResponse['date']});
      this.setState({time: (certificateResponse['time'])});
      this.setState({slug: certificateResponse['slug']});
      this.setState({played_once: true});

      //Store the slug in local storage
      window.localStorage.setItem('result_slug', JSON.stringify(certificateResponse['slug']));
    }

    if(!this.state.played_once) navigate('/dashboard');
  }

  render() {
    return (

      // <Navigation/>

      <React.Fragment>

       

      <div className="bodyArea">

        <Menu/>
        <div className="certificateCopy">
          <Helmet>
            <meta charSet="utf-8" />
            <title>সনদপত্র</title>
          </Helmet>
      
          <Container>
              <Row>
                  <Col lg={12}>

                      <div className="certificateContent">
                          <div className="certificatebo">
                                
                              <div>
                                  <img className="speedbang" src={speedbang} />
                                  <img className="win" src={win} />
                              </div>
                          
                            <h2> অভিনন্দন {this.state.name}</h2>
                            <p> তুমুল গতিতে দুর্দান্ত দক্ষতায় শুদ্ধ বাংলা লিখেছেন মাত্র   </p>
                            <p> { getMinutes(this.state.time) } মিনিট  {getSeconds(this.state.time)} সেকেন্ডে।   </p> 

                            <h3> তারিখঃ {this.state.date}</h3>

                            <button className="btn btn-success" onClick={() => window.print()}>প্রিন্ট করুন</button>
                          </div>
                      </div>

                          <div className="text-center">
                            <Link to={`/result/${this.state.slug}`} state={{ slug: this.state.slug }} className="btn btn-primary">Share</Link>
                          </div>
                      </Col>
                  </Row>
                  </Container>
                      
           
                 
            </div>
          </div>

       
        
      </React.Fragment>


    )
  }
}

