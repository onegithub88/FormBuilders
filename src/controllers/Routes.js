import React from 'react';
import {Provider} from 'react-redux';
import Store from './../redux/Store';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import  './../assets/common/css/bootstrap.min.css';
import  './../assets/common/custome.css';
import  './../assets/common/css/font-awesome.min.css';
import Home from './../views/Home';
const checkAuth = () => (
  <Router>
    <Provider store={Store} >
      <Route  path="/" component={Home} />
    </Provider>
  </Router>
);
export default checkAuth;
