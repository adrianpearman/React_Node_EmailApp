// gathering the keys from the config file
const keys = require('../config/keys');
// retrieving the stripe module from the server's npm modules
const stripe = require('stripe')(keys.stripeSecretKey);
//
const requireLogin = require('../middlewares/requireLogin')

// this request will create the charge and sumit it to our backend api
module.exports = app => {
  // version 1 - no asychronus
  // app.post('/api/stripe', requireLogin, (req, res) =>{
  //   // // this console log shows the token value when the charge is submitted, which will highlight the charge id, card details and cline t details
  //   // console.log(req.body);
  //   stripe.charges.create({
  //     amount: 500,
  //     currency: 'usd',
  //     description: 'Payment for credits',
  //     source: req.body.id
  //   })
      // req.user.credits += 5
      // const user = await new user.save();
      // res.send(user)
  // });

  // version 2 - adding asychronus abilities to the version 1 code
  // the requireLoginfunction is called in to validate whether is logged in
  app.post('/api/stripe', requireLogin, async (req, res) =>{
    // // this console log shows the token value when the charge is submitted, which will highlight the charge id, card details and cline t details
    // console.log(req.body);
    // validates if to insure the user is signed in

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Payment for credits',
      source: req.body.id
    });

    req.user.credits += 5;
    // the new copy of the user is resaved and becomes the basis for any new data basis point
    const user = await req.user.save();
    // console.log(charge);
    res.send(user);
  });
};
