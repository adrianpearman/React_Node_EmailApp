import "materialize-css/dist/css/materialize.min.css";
// no relative direction is need in this case, as it will go and pull the accompanying files from the node module
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store";

// for the purpose of testing the email, we will use axios in the index. applications like postman wont work properly as the application requires us to be logged in.
import axios from "axios";
window.axios = axios;
// the code below is used to test the survey object.
// const survey = {
//   title: 'test title',
//   subject: 'test subject',
//   recipients: 'adrianpearman12@gmail.com',
//   body: 'test data'
//

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RootApp />, document.getElementById("root"));

// console.log('STRIPE_SECRET_KEY', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is', process.env.NODE_ENV);
