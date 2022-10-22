const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: String,
  allAnswers: Array,
  correctAnswer: String,
  language: String,
  track: String,
},
{
  timestamps: true,
});

const User = mongoose.model('questions', questionSchema);

module.exports = User;
