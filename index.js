const express = require('express');
const authRoutes = require ('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require ('cookie-session');
const passport = require('passport');
// model is placed before passport due to loading sequence. for future projects using passport, be sure to have the model placed before the passport files
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true})
const app = express();

// cookies will need to be used to manage whther a user has used the application recently
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, // 30 days
    keys: [keys.cookieKey] // the cookie session is able to select from multiple cookie key values so having it an array is best practice
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app)

// this below code will allow the code to be run on either heroku or locally
const PORT = process.env.PORT || 5000
// The application is being made available on localhost:5000
app.listen(PORT)
