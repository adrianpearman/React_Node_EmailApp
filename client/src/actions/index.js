// axios is used to create our ajax requests
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// // version 1
// export const fetchUser = () => {
//   return function(dispatch){
//     axios.get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res}));
//     }
//  }

// version 2 - refactored
// due to this function only having a single function, we dont need the return variable and can pass the dispatch action to the first arrow function
// using the await syntax, we can then remove the .then() function as well
// performance wish it is the same as version 1
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data });
}

// this function will send a post request to the api and update the tokens
export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data })
}

// this functionwill send the form data to server to be sent out as a n email
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  // the history object will allow on submit to have the client redirected to './surveys'
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}


export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}
