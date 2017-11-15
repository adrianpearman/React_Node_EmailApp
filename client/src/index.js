import 'materialize-css/dist/css/materialize.min.css'
// no relative direction is need in this case, as it will go and pull the accompanying files from the node module
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// for the purpose of testing the email, we will use axios in the index. applications like postman wont work properly as the application requires us to be logged in.
import axios from 'axios';
window.axios = axios;
// the code below is used to test the survey object.
// const survey = {
//   title: 'test title',
//   subject: 'test subject',
//   recipients: 'adrianpearman12@gmail.com',
//   body: 'test data'
//

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
   document.getElementById('root')
 )

// console.log('STRIPE_SECRET_KEY', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is', process.env.NODE_ENV);
