if (process.env.NODE_ENV === 'production') {
  // in production. use the appropriate keys
  module.exports = require('./prod')
}else {
  // not in production. used non production code
  module.exports = require('./dev')
}
