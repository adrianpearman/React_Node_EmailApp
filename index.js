const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send({ hi: 'there'})
})

// this below code will allow the code to be run on either heroku or locally
const PORT = process.env.port || 5000
// The application is being made available on localhost:5000
app.listen(PORT)
