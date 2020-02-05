const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

let passportCallbackURL = "/auth/google/callback";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // controls the redirect to log into a users google account
      callbackURL: passportCallbackURL,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        // this line below will create a new instance of User
        const user = await new User({ googleID: profile.id }).save();
        done(null, user);
      }
    }
  )
);
