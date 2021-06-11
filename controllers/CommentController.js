const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.create = async(req, res) => {
    try {
        
        const newComment = new Comment({...req.body});
        const comment = await newComment.save();
        res.status(200).json({
            comment,
            message: 'Comment added Sucessfully'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Returns a specific Comment
exports.findOne = async function (req, res) {
    try {
        const id = req.params.id;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(401).json({message: 'Comment does not exist'});

        res.status(200).json({comment});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Update Comment
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
   
  
    Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Comment with id=${id}. Maybe Comment was not found!`
          });
        } else res.send({ message: "Comment was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Comment with id=" + id
        });
      });
  }

// Delete Comment
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
          });
        } else {
          res.send({
            message: "Comment was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id
        });
      });
    
  };

  