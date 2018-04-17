// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../middleware/isAuthenticated");

module.exports = app => {
  app.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

  app.get("/user/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/userLogin.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/user/start", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userStart.html"));
  });

  app.get("/user/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userSignup.html"));
  });
};
