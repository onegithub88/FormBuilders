import React from 'react';
import {Provider} from 'react-redux';
import Store from './../redux/Store';
import history from './History';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import  './../assets/common/css/bootstrap.min.css';
import  './../assets/common/custome.css';
import  './../assets/common/css/font-awesome.min.css';
import Home from './../views/Home';
import FormBuilders from './../views/FormBuilders';
import FormViewer from './../views/FormViewer';

const checkAuth = () => (
    <Provider store={Store} >
      <Router history={history}>
        <Switch>
          <Route  exact path="/" component={Home} />
          <Route  path="/formbuilder/:idWorkFlow/:idForm" component={FormBuilders} />
          <Route  path="/formviwer" component={FormViewer}  isAuthed={true}  />
    </Switch>
    </Router>
  </Provider>
);
export default checkAuth;
