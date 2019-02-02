const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  //Never put plain text passwords in database
  password: {
    type: String,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);