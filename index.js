const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys')

const app = express();

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  // controls the redirect to log into a users google account
  callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
  })
);

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'))
// this below code will allow the code to be run on either heroku or locally
const PORT = process.env.PORT || 5000
// The application is being made available on localhost:5000
app.listen(PORT)
