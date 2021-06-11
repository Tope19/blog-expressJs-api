const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
    comment_body: {
      type: String,
      required: true,
      max: 255
    },
  }, {timestamps: true})
    


module.exports = mongoose.model('Comments', CommentSchema);