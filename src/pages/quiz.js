import React, { Component, useEffect } from 'react';
import Menu from '../components/Menu';
import { getQuestionsData, storeAnswer } from '../services/quiz/QuestionService';
import Timer from 'react-timer';
import { navigate } from 'gatsby';
import { checkLoggedIn } from '../services/auth/AuthService';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import dummy from '../images/dummy.png';
 

export default class Quiz extends Component {

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(!isLoggedIn) navigate('/signin');
  }

  state = {
    time_spend: '00:00:00',
    time_ms: 0,
    questions: [],
    activeQuestion: {},
    activeQuestionNo: 1,
    given_answer: '',
    is_answer_correct: false,
    is_pasted: false,
    OPTIONS : { prefix: 'seconds elapsed!', delay: 100},
    is_last_question : false,
    wrong_answer: false
  }

  async componentDidMount() {
    await this.getQuestions();
  }

  getQuestions = async() => {
    let questions = await getQuestionsData();
    this.setState({ questions });
    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];

      this.setState({ 
        activeQuestion: item
      });
      
      break;
    }
    console.log(questions)
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.state.is_last_question) {
        this.onFinalSubmitAnswer();
      }else{
        this.onSubmitAnswer();
      }
    }
  }


  checkAnswer = (e) => {
    if(!this.state.is_pasted){
      let given_answer = e.target.value;
      this.setState({ given_answer: e.target.value });
  
      // check with the question answer
      if(given_answer.trim() === this.state.activeQuestion.correct_answer.trim()){
        this.setState({ is_answer_correct: true });
      }else{
        this.setState({ is_answer_correct: false });
      }
    }
  }

  checkPasteAnswer = () => {
    this.setState({ 
      given_answer: '',
      is_answer_correct: false,
      is_pasted: true
    });
    alert('Sorry !! Paste is disabled here !!');
  }

  onSubmitAnswer = () => {

    if(!this.state.is_answer_correct){
      this.setState({wrong_answer: true});
      // alert('Sorry !! You have not completed the correct answer !!');
      return false;
    }

    let previousActiveQuestionNo = this.state.activeQuestionNo;
    let newActiveQuestionNo = previousActiveQuestionNo+1;

    this.setState({ activeQuestionNo: newActiveQuestionNo });
    
    // Update activeQuestion
    this.setState({ 
      activeQuestion: this.state.questions[newActiveQuestionNo-1],
      given_answer : '',
      is_answer_correct: false,
      wrong_answer: false
    });

    if(this.state.questions.length == newActiveQuestionNo){
      this.setState({ is_last_question: true });
    }
  }

  onFinalSubmitAnswer = async() => {

    if(!this.state.is_answer_correct){
      this.setState({wrong_answer: true});
      // alert('Sorry !! You have not completed the correct answer !!');
      return false;
    }

    // Submit to the database the final answer
    let submitResponse = await storeAnswer(this.state.time_ms);

    if(submitResponse.status){
      navigate('/certificate');
    }else{
      alert(submitResponse.message);
    }

  }


  onChangeTime = (timeObject) => {
    this.setState({
      time_spend: timeObject.time,
      time_ms: timeObject.clock,
    });
  }


  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>কুইজ</title>
          </Helmet>
          <Menu/>
          <React.Fragment>
            <div className="container">
              <Row>

                
              <Col lg={6} className="shows">
                   {/* <div className="boxSorry">
                      {
                        this.state.wrong_answer &&
                        <h1>দুঃখিত, আপনার উত্তরটি সঠিক হয়নি</h1>
                      }
                   </div> */}

                    <div className="brandImageBox">
                        <img src={dummy} />
                    </div>
                </Col>

                <Col lg={6} className="quiz">
                <div className="clock">
                  <i class="far fa-clock"></i>
                  <Timer 
                  
                    options={this.state.OPTIONS}
                    onChangeTime={(timeObject) => this.onChangeTime(timeObject)}
                  />
                </div>
                
              <h2>  <i class="fas fa-question"></i> কুইজ আরম্ভ হয়েছে  </h2>
              
                  {
                    this.state.wrong_answer &&
                    <div className="boxSorry">
                      <h3>দুঃখিত, আপনার উত্তরটি সঠিক হয়নি</h3>
                    </div>
                  }
              
              <div>

                <div className="question">
                    <h4>
                    প্রশ্নঃ  { this.state.activeQuestion.title}
                    </h4>
                    <div>
                      <input type="text" 
                      value={this.state.given_answer} 
                      className={this.state.wrong_answer ? 'form-control form-control-error' : 'form-control'}
                      onPaste={() => this.checkPasteAnswer()}
                      onChange={(value) => this.checkAnswer(value)} 
                      onKeyDown={this._handleKeyDown}
                      />
                    </div>
                </div>

                {/* {
                  this.state.is_answer_correct &&  !this.state.is_last_question &&
                  <button className="btn btn-success" onClick={this.onSubmitAnswer}>
                    পরবর্তী <i className="fa fa-arrow-right"></i>
                  </button>
                } */}

                {
                  !this.state.is_last_question &&
                  <button className="btn btn-success" onClick={this.onSubmitAnswer}>
                    পরবর্তী <i className="fas fa-hand-point-right"></i>
                   </button>
                }

                {/* {
                  this.state.is_answer_correct && this.state.is_last_question && 
                  <button className="btn btn-success" onClick={this.onFinalSubmitAnswer}>
                    জমা দিন 
                  </button>
                } */}

                {
                  this.state.is_last_question && 
                  <button className="btn btn-success" onClick={this.onFinalSubmitAnswer}>
                    জমা দিন 
                  </button>
                }
                

              </div>
                </Col>


                <Col lg={6} className="hides">
                   {/* <div className="boxSorry">
                      {
                        this.state.wrong_answer &&
                        <h1>দুঃখিত, আপনার উত্তরটি সঠিক হয়নি</h1>
                      }
                   </div> */}

                    <div className="brandImageBox">
                        <img src={dummy} />
                    </div>
                </Col>


              </Row>
              <Row>
                <Col lg={12}>
                  {/* <div className="boxSorry">
                      {
                        this.state.wrong_answer &&
                        <h1>দুঃখিত, আপনার উত্তরটি সঠিক হয়নি</h1>
                      }
                  </div> */}
                </Col>
              </Row>
            </div>
          </React.Fragment>
      </div>
    )
   
  }
}

