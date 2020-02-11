import React, { Component } from 'react';
import { Container, Row, Col} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { getResult } from '../services/quiz/QuestionService';
import Navigation from '../components/Navigation';
import speedbang from '../images/sppedimg.png';
import win from '../images/win.png';
import Menu from '../components/Menu';
import { getSeconds, getMinutes } from '../services/Utils/TimeHelper';
// import { navigate } from 'gatsby';

// import {Router} from '@reach/router';

import { base_url, api_base_url } from '../../config.json';


export default class result extends Component {

  state = {
    slug : '',
    responseData: {
      name : '',
      date : '',
      time : '',
      slug : ''
    },
    full_url: ''
  }

  async componentDidMount() {
    let path = window.location.pathname;
    let slug = path.split("/").pop();
    // console.log('slug is',slug);
    // this.setState({ slug: slug });

    let storage_slug = window.localStorage.getItem('result_slug');
    let result_slug = JSON.parse(storage_slug);
    this.setState({ slug: result_slug });



    // alert(result_slug);

    // Search to server
    let resultResponse = await getResult(slug);

    if(resultResponse != null){
      this.setState({responseData:{
      name: resultResponse['name'], 
      date: resultResponse['date'], 
      time: (resultResponse['time']), 
      slug: resultResponse['slug']}
      });
    }
  }

  // componentDidMount() {
    
    
  // };

  render() {

    return (
       
  
      <React.Fragment>

       

          <div className="bodyArea">
            <div className="certificateCopy">
              <Container>
                  <Row>
                      <Col lg={12}>
                        
                          <div className="certificateContent">

                             <Helmet>
                                <meta charSet="utf-8" />
                                <title>ফলাফল</title>
                                <link rel="canonical" href={`${base_url}`} />

                                {/* Facebook meta tags  */}
                                <meta property="og:type"               content="website" />
                                <meta property="og:url"                content={`https://speedbangla.akij.net/result/${this.state.slug}`} />
                                <meta property="og:title"              content="Speed Bangla" />
                                <meta property="og:description"        content="Speed Bangla Daily Result" />
                                <meta property="og:image"              content="https://crm.akij.net/public/img/speedBangla/fb-image.png" />

                                
                              </Helmet>

                  
                              <div>
                                    <img className="speedbang" src={speedbang} />
                                    <img className="win" src={win} />
                                </div>
                            
                              <h2> অভিনন্দন <br/> {this.state.responseData.name} </h2>
                              <p> তুমুল গতিতে দুর্দান্ত দক্ষতায় শুদ্ধ বাংলা লিখেছেন মাত্র   </p>
                              <p> { getMinutes(this.state.responseData.time) } মিনিট  { getSeconds(this.state.responseData.time) } সেকেন্ডে।   </p> 

                              <h3> তারিখঃ {this.state.responseData.date}</h3>

                              

                          </div>
                          <div className="text-center">
                            {/* <a href={`https://www.facebook.com/sharer/sharer.php?u=${base_url}/result/${this.state.slug}`} target="_blank" className="btn btn-primary">
                              <i className="fa fa-facebook"></i> Share on facebook
                            </a> */}

                            {/* For temporary use only */}
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${base_url}`} target="_blank" className="btn btn-primary">
                            <i class="fab fa-facebook-square"></i>  Share on facebook
                            </a>
                           
                          </div>
                      </Col>

                  </Row>
                  </Container>
                      
           
                 
            </div>
          </div>

       
          {/* <Router>
            <result path="/result/:slug" />
          </Router> */}

      </React.Fragment>
    )
  }
}