const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require ('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
// model is placed before passport due to loading sequence. for future projects using passport, be sure to have the model placed before the passport files
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true})
const app = express();

app.use(bodyParser.json());

// cookies will need to be used to manage whther a user has used the application recently
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, // 30 days
    keys: [keys.cookieKey] // the cookie session is able to select from multiple cookie key values so having it an array is best practice
  })
);

app.use(passport.initialize());
app.use(passport.session());

require ('./routes/authRoutes')(app);
require ('./routes/billingRoutes')(app);
require ('./routes/surveyRoutes')(app);



// this line of code will only run when on the main server
if (process.env.NODE_ENV === 'production') {
  // when the production version is run, the application will use the build files
  app.use(express.static('client/build'));
  const path = require('path');

  // this line of code will cause the express router to re-route any url that the whole application doesnt make reference of, to the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// this below code will allow the code to be run on either heroku or locally
const PORT = process.env.PORT || 5000
// The application is being made available on localhost:5000
app.listen(PORT)
//
