import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Stripe extends Component{
  render(){
    return(
      // Typically the StripeCheckout function will provide a default button. In order to change it to match the styling of the whole application, we add a button element as a child element and pass the material css class to add styling to the element.
      <StripeCheckout
        name = "Email App"
        description = "Please add credits to your account! $5 for 5 credits"
        amount={500} // this will dictate the amount need per credit. It will also default to $USD unless told. the amount avriable also requires the amount in cents
        token={token => this.props.handleToken(token)} // this token keyword refers to the callback after we've redceived the callback from the strip api.
        stripeKey={process.env.REACT_APP_STRIPE_KEY} // The public key from the .env.development file.
      >
        <button className='btn'>
          Add Credits
        </button>
      </StripeCheckout>

    )
  }
}

export default connect(null, actions)(Stripe);
