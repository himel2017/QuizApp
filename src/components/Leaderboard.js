import React, { Component } from 'react';
import { Container , Row , Col } from "react-bootstrap";
import { navigate, Link } from 'gatsby';
import { checkLoggedIn } from '../services/auth/AuthService';
import { getDailyWinners, getMonthlyWinners } from '../services/quiz/QuestionService';
import { Helmet } from "react-helmet";
import { base_url, api_base_url } from '../../config.json';

import { getSeconds, getMinutes } from '../services/Utils/TimeHelper';

export default class Leaderboard extends Component {

    state = {
        first_winner : '',
        second_winner : '',
        third_winner : '',
        fourth_winner : '',
        fifth_winner : '',
        sixth_winner : '',
        seventh_winner : '',
        eighth_winner : '',
        ninth_winner : '',
        tenth_winner : '',

        first_time : '',
        second_time : '',
        third_time : '',
        fourth_time : '',
        fifth_time : '',
        sixth_time : '',
        seventh_time : '',
        eighth_time : '',
        ninth_time : '',
        tenth_time : '',

        monthlyWinners: [],
        dailyWinners: [],

        monthly_first_winner : '',
        monthly_second_winner : '',
        monthly_third_winner : '',

        monthly_first_time : '',
        monthly_second_time : '',
        monthly_third_time : '',

        slug : ''
    }

    async componentDidMount() {
        let isLoggedIn = await checkLoggedIn();
        if(isLoggedIn) navigate('/');

        let winnerResponse = await getDailyWinners();
        this.setState({ dailyWinners : winnerResponse });

        if(winnerResponse.length != 0){

            if(winnerResponse.length >= 1){

                this.setState({first_winner: winnerResponse[0]['winnerName']['name']});
                this.setState({first_time: (winnerResponse[0]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 2){

                this.setState({second_winner: winnerResponse[1]['winnerName']['name']});
                this.setState({second_time: (winnerResponse[1]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 3){

                this.setState({third_winner: winnerResponse[2]['winnerName']['name']});
                this.setState({third_time: (winnerResponse[2]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 4){

                this.setState({fourth_winner: winnerResponse[3]['winnerName']['name']});
                this.setState({fourth_time: (winnerResponse[3]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 5){

                this.setState({fifth_winner: winnerResponse[4]['winnerName']['name']});
                this.setState({fifth_time: (winnerResponse[4]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 6){

                this.setState({sixth_winner: winnerResponse[5]['winnerName']['name']});
                this.setState({sixth_time: (winnerResponse[5]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 7){

                this.setState({seventh_winner: winnerResponse[6]['winnerName']['name']});
                this.setState({seventh_time: (winnerResponse[6]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 8){

                this.setState({eighth_winner: winnerResponse[7]['winnerName']['name']});
                this.setState({eighth_time: (winnerResponse[7]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 9){

                this.setState({ninth_winner: winnerResponse[8]['winnerName']['name']});
                this.setState({ninth_time: (winnerResponse[8]['time'] / 60000).toFixed(2)});
            }

            if(winnerResponse.length >= 10){

                this.setState({tenth_winner: winnerResponse[9]['winnerName']['name']});
                this.setState({tenth_time: (winnerResponse[9]['time'] / 60000).toFixed(2)});
            }
        }

        let monthlyWinnerResponse = await getMonthlyWinners();
        this.setState({ monthlyWinners : monthlyWinnerResponse });

       
        // if(monthlyWinnerResponse.length >= 1){

        //     this.setState({monthly_first_winner: monthlyWinnerResponse[0]['winnerName']['name']});
        //     this.setState({monthly_first_time: (winnerResponse[0]['time'] / 60000).toFixed(2)});
        // }

        // if(monthlyWinnerResponse.length >= 2){

        //     this.setState({monthly_second_winner: monthlyWinnerResponse[1]['winnerName']['name']});
        //     this.setState({monthly_second_time: (winnerResponse[1]['time'] / 60000).toFixed(2)});
        // }

        // if(monthlyWinnerResponse.length >= 3){

        //     this.setState({monthly_third_winner: monthlyWinnerResponse[2]['winnerName']['name']});
        //     this.setState({monthly_third_time: (winnerResponse[2]['time'] / 60000).toFixed(2)});
        // }
    }

    getBanglaPositionName = (value) => {
        let position = "";
        switch (value) {
            case 1:
                position = "প্রথম";
                break;
            case 2:
                position = "দ্বিতীয়";
                break;
            case 3:
                position = "তৃতীয়";
                break;
            case 4:
                position = "চতুর্থ";
                break;
            case 5:
                position = "পঞ্চম";
                break;
            case 6:
                position = "ষষ্ঠ";
                break;
            case 7:
                position = "সপ্তম";
                break;
            case 8:
                position = "অষ্টম";
                break;
            case 9:
                position = "নবম";
                break;
            case 10:
                position = "দশম";
                break;
            default:
                position = value;
                break;
        }
        return position;
    }

    render() {
        return (
            <div className="login bp">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>লিডারবোর্ড</title>
                    <link rel="canonical" href={`${base_url}`} />

                    {/* Facebook meta tags  */}
                    <meta property="og:url"                content={`${base_url}/leaderboard`} />
                    <meta property="og:type"               content="website" />
                    <meta property="og:title"              content="Speed Bangla" />
                    <meta property="og:description"        content="Speed Bangla Leaderboard" />
                    <meta property="og:image"              content="https://crm.akij.net/public/img/speedBangla/fb-image.png" />
                </Helmet>
                <Container>
                    <Row>
                        <Col lg={12} className="list">
                            <h1>প্রতিযোগিতার শীর্ষ ৩ জন</h1>
                            {
                                this.state.monthlyWinners.map((item, index) => (
                                    <ul>
                                        <li> {this.getBanglaPositionName(index+1)} স্থানঃ {item.winnerName.name} 
                                        || সময় নিয়েছেনঃ 
                                        { getMinutes(item.time) } মিনিট  
                                        {' '}
                                        { getSeconds(item.time) } সেকেন্ড 
                                        </li>
                                    </ul>
                                ))
                            }
                            {/* <h2> প্রথম স্থানঃ {this.state.monthly_first_winner} || সময় নিয়েছেনঃ {this.state.monthly_first_time} মিনিট </h2>
                            <h2> দ্বিতীয় স্থানঃ {this.state.monthly_second_winner} || সময় নিয়েছেনঃ {this.state.monthly_second_time} মিনিট </h2>
                            <h2> তৃতীয় স্থানঃ {this.state.monthly_third_winner} || সময় নিয়েছেনঃ {this.state.monthly_third_time} মিনিট </h2> */}

                            <br></br>
 
                            <h1>দৈনিক শীর্ষ ১০ জন</h1>
                            {
                                this.state.dailyWinners.map((item, index) => (
                                    <ul>
                                        <li> {this.getBanglaPositionName(index+1)} স্থানঃ {item.winnerName.name} 
                                        || সময় নিয়েছেনঃ 
                                        { getMinutes(item.time) } মিনিট  
                                        {' '}
                                        { getSeconds(item.time) } সেকেন্ড 
                                        </li>
                                    </ul>
                                ))
                            }

                            {/* <h2> প্রথম স্থানঃ {this.state.first_winner} || সময় নিয়েছেনঃ {this.state.first_time} মিনিট </h2>
                            <h2> দ্বিতীয় স্থানঃ {this.state.second_winner} || সময় নিয়েছেনঃ {this.state.second_time} মিনিট </h2>
                            <h2> তৃতীয় স্থানঃ {this.state.third_winner} || সময় নিয়েছেনঃ {this.state.third_time} মিনিট </h2>
                            <h2> চতুর্থ স্থানঃ {this.state.fourth_winner} || সময় নিয়েছেনঃ {this.state.fourth_time} মিনিট </h2>
                            <h2> পঞ্চম স্থানঃ {this.state.fifth_winner} || সময় নিয়েছেনঃ {this.state.fifth_time} মিনিট </h2>
                            <h2> ষষ্ঠ স্থানঃ {this.state.sixth_winner} || সময় নিয়েছেনঃ {this.state.sixth_time} মিনিট </h2>
                            <h2> সপ্তম স্থানঃ {this.state.seventh_winner} || সময় নিয়েছেনঃ {this.state.seventh_time} মিনিট </h2>
                            <h2> অষ্টম স্থানঃ {this.state.eighth_winner} || সময় নিয়েছেনঃ {this.state.eighth_time} মিনিট </h2>
                            <h2> নবম স্থানঃ {this.state.ninth_winner} || সময় নিয়েছেনঃ {this.state.ninth_time} মিনিট </h2>
                            <h2> দশম স্থানঃ {this.state.tenth_winner} || সময় নিয়েছেনঃ {this.state.tenth_time} মিনিট </h2> */}

                                <br></br>

                            {/* <a href="https://www.facebook.com/sharer/sharer.php?u=https://speedbangla.akij.net/leaderboard" target="_blank" className="btn btn-primary">
                                Share to facebook
                            </a> */}

                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${base_url}/leaderboard`} target="_blank" className="btn btn-primary">
                            <i className="fab fa-facebook-square"></i>  Share on facebook
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
