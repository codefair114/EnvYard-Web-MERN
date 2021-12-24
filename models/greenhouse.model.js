const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const greenhouseSchema = new Schema({
  email: { type: String, required: true },
  gid: { type: Number, required: true },
  name: { type: String, required: true },
  surface: { type: Number, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const Greenhouse = mongoose.model('Greenhouse', greenhouseSchema);

module.exports = Greenhouse;