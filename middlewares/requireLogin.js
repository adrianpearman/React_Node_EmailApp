// middleware is a function that takes the incoming request and modifyies it.
// next is a function called when the middleware is complete.
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({error: 'You must log in'})
  }
    
  next()
};
