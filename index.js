const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const ngrok = require("ngrok");
require("./models/User");
require("./models/Survey");
// models are placed before passport due to loading sequence. for future projects using passport, be sure to have the model placed before the passport files
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
// cookies will need to be used to manage whther a user has used the application recently
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // the cookie session is able to select from multiple cookie key values so having it an array is best practice
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  //ngrok
  (async function() {
    const url = await ngrok.connect(PORT);
    console.log(url);
  })();
}

app.listen(PORT, () => {
  console.log(`Running on PORT:${PORT}`);
});
