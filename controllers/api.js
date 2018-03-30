const db = require("../models");

module.exports = app => {
  app.get("/my-pet/api/:name", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }

    db.Pets.findAll({
      where: { name: req.params.name },
      include: [db.User]
    }).then(data => {
      res.json(data);
    });
  });

  app.get("/my-pet/api", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }
    db.Pets.findAll({
      where: { UserId: req.user.id },
      include: [db.User]
    }).then(data => {
      console.log("/my-pet/api");
      console.log({ where: { UserId: req.user.id } });
      res.json(data);
    });
  });

  app.post("/my-pet/api", (req, res) => {
    db.Pets.create({
      name: req.body.name,
      lastFed: Date.now(),
      petType: req.body.petType,
      UserId: req.body.UserId
    }).then(data => {
      console.log(data);
      res.end();
    });
  });

  app.delete("/home/api/:id", (req, res) => {
    db.Pets.destroy({ where: { id: req.params.id } }).then(data => {
      console.log(data);
      res.end();
    });
  });
};
