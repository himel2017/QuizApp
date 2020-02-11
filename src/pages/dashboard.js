import React, { Component, useEffect } from 'react';
import { navigate } from 'gatsby';

import { checkLoggedIn } from '../services/auth/AuthService';
import Menu from '../components/Menu';
import DashboardBody from '../components/dashboardBody';
import { Helmet } from "react-helmet";


export default class dashboard extends Component {

  async componentDidMount() {
    let isLoggedIn = await checkLoggedIn();
    if(!isLoggedIn) navigate('/signin');
  }

  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>মূলপাতা</title>
          </Helmet>
          <Menu/>
          <DashboardBody/>
      </div>
    )
  }
}

