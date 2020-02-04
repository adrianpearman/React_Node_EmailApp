const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    // this portion will redirect the post-login request and send the application to a different route
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    // .logout is a function attached to the req object, from passport which kills the id attached with the cookie
    req.logout();
    res.redirect("/"); // sends the user back to the rootpage of the app
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
