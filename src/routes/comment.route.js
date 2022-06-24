module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    const { authJwt } = require("../middleware/middleware.index");

    // Create a new Comment
    router.post("/", [
      authJwt.verifyToken
    ], comments.create);

    // Retrieve all Comments
    router.get("/", [
      authJwt.verifyToken
    ], comments.findAll);

    // // Retrieve a single Comment with id
    router.get("/:id", [
      authJwt.verifyToken
    ], comments.findOne);

    // Update a Comment with id
    router.put("/:id", [
      authJwt.verifyToken,
      authJwt.verifyUser
    ], comments.update);

    // Delete a Comment with id
    router.delete("/:id", [
      authJwt.verifyToken,
      authJwt.verifyUser
    ], comments.delete);

    // Delete all Comments
    router.delete("/", [
      authJwt.verifyToken,
      authJwt.isAdmin
    ], comments.deleteAll);

    app.use('/api/comment', router);
  };