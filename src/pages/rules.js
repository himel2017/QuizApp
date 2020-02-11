import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { navigate } from 'gatsby';
import { checkLoggedIn } from '../services/auth/AuthService';
import Rules from '../components/Rules';
import { Helmet } from "react-helmet";
 

export default class rules extends Component {

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(isLoggedIn) navigate('/dashboard');
  }

  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>নিয়মাবলী</title>
          </Helmet>
          <Navigation/>
          <Rules/>
      </div>
    )
  }
}

