import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FIELDS from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewList = _.map(FIELDS, ({ name, label}) => {
    return(
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })


  return(
    <div>
      <h4>Please confirm your entries</h4>
      {reviewList}
      <button
        className='yellow darken-3 btn-flat white-text'
        onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className='green btn-flat right white-text'>
        Send Surveys
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

// the values in this function are sent as prop values to surveyReview function due to the connect function given to us from the connect function
function mapStateToProps(state){
  // console.log(state);
  return{
    formValues: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))
