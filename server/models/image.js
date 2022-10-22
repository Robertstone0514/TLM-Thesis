const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Image = mongoose.model('Image', imgSchema); // Set the Images Collection

module.exports = Image;
