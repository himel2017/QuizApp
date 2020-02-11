import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Leaderboard from '../components/Leaderboard';
import { navigate } from 'gatsby';
import { checkLoggedIn } from '../services/auth/AuthService';
import { Helmet } from "react-helmet";
 

export default class leaderboard extends Component {

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(isLoggedIn) navigate('/dashboard');
  }

  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>লিডারবোর্ড</title>
          </Helmet>
          <Navigation/>
          <Leaderboard/>
      </div>
    )
  }
}

