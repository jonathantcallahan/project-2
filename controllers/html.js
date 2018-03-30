const path = require("path");

module.exports = app => {

  app.get("/home", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/", "home-2.html"))
  );
  
};
