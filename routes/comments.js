module.exports = app => {
    const comments = require("../controllers/CommentController");

    var router = require('express').Router();

     // Create a new Comment
    router.post("/create", comments.create);

    app.use('/api/comments', router);
}