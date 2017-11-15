// validates whether there is enough credits to send a survey
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({error: 'Not enough credits, please add some to your account.'})
  }

  next()
};
