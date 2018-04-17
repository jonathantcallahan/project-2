const path = require("path");
const isAuthenticated = require("../middleware/isAuthenticated");

module.exports = app => {
  app.get("/home", isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, "../public/", "home-2.html"))
  );
};
