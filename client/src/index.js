import 'materialize-css/dist/css/materialize.min.css'
// no relative direction is need in this case, as it will go and pull the accompanying files from the node module
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
   document.getElementById('root')
 )

console.log('STRIPE_KRY', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
