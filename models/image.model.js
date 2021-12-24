const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  greenhouse: { type: Number, required: true },
  name: { type: String, required: false },
  level: { type: Number, required: true },
  userid: { type: String, required: false },
  diagnosis: { type: String, required: false },
  type: { type: String, required: true },
  url: { type: String, required: true }
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;