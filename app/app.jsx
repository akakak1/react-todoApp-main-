var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');   // this will allow the child components to access the store and call dispatch
var {hashHistory} = require('react-router'); // Object Destructuring



var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {     // the onAuthStateChanged()  will be called whenever there is a change in the auth status.
  if (user) {
    store.dispatch(actions.login(user.uid));
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
})


store.dispatch(actions.startAddTodos());


//Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')


ReactDOM.render(
  <Provider store={store}>
      {router}        
  </Provider>,
  document.getElementById('app')
);

//Use of HASH History .....................
// we want hash history .... which will be stored on the client, we dont have to do anything on the server with our Router.
