import React, { Component, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Body from '../components/Body';
import { navigate } from 'gatsby';
import { Helmet } from "react-helmet";

import { checkLoggedIn } from '../services/auth/AuthService';


export default class index extends Component {

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(isLoggedIn) navigate('/dashboard');
  }

  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>মূলপাতা</title>
          </Helmet>
          <Navigation/>
          <Body/>
      </div>
    )
  }
}

