const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

// let passportCallbackURL =
//   process.env.NODE_ENV === "production" ? "http://localhost:5000/auth/google/callback"  : "/auth/google/callback";

let passportCallbackURL = "/auth/google/callback";

passport.serializeUser((user, done) => {
  // user in this instance is the user pulled from the mongo database, the unique identifier for each of the mongo entries
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    // because the mongoDB request is asynchronus and returns a promise that will be resolved after the matching id is found; .then and done is inserted
    .then(user => {
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
    // version 1 - pre refactoring a no asynchronus calls
    // (accessToken, refreshToken, profile, done) => {
    //   // console.log(accessToken);
    //   // console.log(refreshToken);
    //   // console.log(profile);

    //   // validation to insure the ID is not currently in the database
    //   // this line below finds the first instance of the User ID
    //   User.findOne({ googleID: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       done(null, existingUser);
    //     } else {
    //       // this line below will create a new instance of User
    //       new User({ googleID: profile.id })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    // }

    // version 2 - refactored version w/ asychronus calls
    async (accessToken, refreshToken, profile, done) => {
      // validation to insure the ID is not currently in the database
      // this line below finds the first instance of the User ID
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
