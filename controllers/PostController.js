
const Post = require('../models/Post');
const mongoose = require('mongoose');
const limit_ = 5;
const {uploader} = require('../utils/index');


// Create and Save a new Post
exports.create = async (req, res) => {
  try {
    const newPost = new Post({...req.body});

    const post = await newPost.save();

    //if there is no image, return success message
    if (!req.file) return res.status(200).json({post, message: 'Post added successfully'});

    //Attempt to upload to cloudinary
    const result = await uploader(req);
    const post_ = await Post.findByIdAndUpdate(post._id, {$set: {image: result.url}}, {new: true});

    res.status(200).json({post: post_, message: 'Post added successfully'});
  } catch (error) {
      res.status(500).json({message: error.message});
  }

};

// Retrieve all Posts from the database.
exports.findAll = async function (req, res) {
  const posts = await Post.find({});
  res.status(200).json({posts});
};

// Retrieve all Posts from the database and Paginate.
exports.paginate = async function (req, res) {
  let aggregate_options = [];

  //PAGINATION -- set the options for pagination
  const options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || limit_,
    collation: {locale: 'en'},
    customLabels: {
        totalDocs: 'totalResults',
        docs: 'posts'
    }
  };

  // Set up the aggregation
  const myAggregate = Post.aggregate(aggregate_options);
  const result = await Post.aggregatePaginate(myAggregate, options);

  res.status(200).json(result);
}

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

 

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
  
};

