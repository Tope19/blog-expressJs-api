const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const PostSchema = new mongoose.Schema({
      
    slug: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String, 
      required: true
    },

    post_body: {
      type: String, 
      required: true
    },
    post_image: {
      type: String,
      default: "",
      required: false,
      max: 255
    },
  }, {timestamps: true})
    

PostSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Posts', PostSchema);