module.exports = app => {
  const posts = require("../controllers/PostController");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", posts.create);

  // Retrieve all posts
  router.get("/", posts.findAll);

  // Paginate all Posts
  router.get("/paginate", posts.paginate);
  
  // Retrieve a single Post with id
  router.get("/:id", posts.findOne);

  // Update a Post with id
  router.put("/:id", posts.update);

  // Delete a Post with id
  router.delete("/:id", posts.delete);


  app.use('/api/posts', router);
};