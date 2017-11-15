// This will show the form that user will input information
import React, { Component } from 'react';
// the field property will format any html element
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields'; //the array of all the Field values

class SurveyForm extends Component{
  // iterates through the FIELDS array an returns the corresponding values to the object keys
  renderFields(){
    return _.map(FIELDS, ({label, name}) => {
      return (
        <Field
          key={name}
          component={SurveyField} //renders the type of html element to be rendered
          type='text'
          label={label}
          name={name} // tells the redux form the typed value and store it under a key of surveyTitle
        />
      )
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to='/surveys' className='red btn-flat left white-text'>
          Cancel
        </Link>
        <button type='Submit' className='teal btn-flat right white-text'>
          Next
          <i className='material-icons right'>done</i>
        </button>
      </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};

  // validates whether or not the title contains valid information
  // if (!values.title) {
  //   errors.title = 'You must provide a Title'
  // }
  errors.recipients = validateEmails(values.recipients || '')

  // validates the input for if they contain data. will return error if not properly done
  _.each(FIELDS, ({ name, Error }) => {
      if (!values[name]) {
        errors[name] = Error
      }
  })

  return errors
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false //prevents the reduxForm deleteing the information when we toggle away from this page
})(SurveyForm)
