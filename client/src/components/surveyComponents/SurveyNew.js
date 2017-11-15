// This will show the new Survey Form and Survey Review

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
  // // Version 1
  // constructor(){
  //   super(props)
  //   this.state = { new: true }
  // }
  
  // Version 2 refactored
  state = { formReview: false }

  renderContent(){
    if (this.state.formReview === true) {
      return <SurveyFormReview
        onCancel={() => this.setState({ formReview: false })}
      />
    }
      return <SurveyForm onSurveySubmit={() => this.setState({ formReview: true })}/>
  }

  render(){
    return(
      <div>
        { this.renderContent() }
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)
