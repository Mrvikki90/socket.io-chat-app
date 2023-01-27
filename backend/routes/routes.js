module.exports = (app) => {
  const tutorials = require("../controllers/controllers");

  var router = require("express").Router();

  router.post("/post", tutorials.create);

  router.get("/getone", tutorials.findOne);

  router.post("/login", tutorials.Login);

  app.use("/api", router);
};
