import React, { Component } from "react";
//  connect is used make redux work properly wit react
import { connect } from "react-redux";
// this will import all of the action creators from the actions application.
import * as actions from "../redux/actions";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveyComponents/SurveyNew";

// version 1
// const App = () => {
//   return (
//     <div className='container'>
//       <BrowserRouter>
//         <div>
//           <Header />
//           <Route exact={true} path='/' component={Landing} />
//           <Route exact={true} path='/surveys' component={Dashboard} />
//           <Route path='/surveys/new' component={SurveyNew} />
//         </div>
//       </BrowserRouter>
//     </div>
//   )
// }

// version 2
class App extends Component {
  // this version includes life cycle methods to automatically load the current user as soon as the component is rendered
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
