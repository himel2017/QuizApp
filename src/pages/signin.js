import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Login from '../components/Login';
import { Helmet } from "react-helmet";
 

export default class signin extends Component {
  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>লগইন</title>
          </Helmet>
          <Navigation/>
          <Login/>
      </div>
    )
  }
}

