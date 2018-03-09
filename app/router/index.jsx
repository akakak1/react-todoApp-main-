import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';



var requireLogin = (nextState, replace, next) => {      // this is react-router middleware.  'replace' function lets use update the url, 
  if (!firebase.auth().currentUser) {                   // 'next' function will help us work with async codes in this middleware function.
    replace('/');                                       // use this middleware with the 'onEnter' property on the desired routes.
  }                                                     // THIS MIDDLEWARE WILL BE USED TO IMPLEMENT THE PRIVATE ROUTE //
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
}


export default (
    <Router history={hashHistory}>           
         <Route path="/">
            <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
            <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
         </Route>
    </Router>
);