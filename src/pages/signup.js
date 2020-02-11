import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Registration from '../components/Registration';
import { Helmet } from "react-helmet";
 

export default class signup extends Component {
  render() {
    return (
      <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>রেজিস্ট্রেশন</title>
          </Helmet>
          <Navigation/>
          <Registration/>
      </div>
    )
  }
}

