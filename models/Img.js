const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImgSchema = new Schema({
  data: {
    type: String,
    required: true
  }
});

module.exports = Img = mongoose.model('img', ImgSchema);