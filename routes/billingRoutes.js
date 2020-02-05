const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
//
const requireLogin = require("../middlewares/requireLogin");

// this request will create the charge and sumit it to our backend api
module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // Charges the user
    await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "Payment for credits",
      source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
