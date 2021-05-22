const mongoose = require('mongoose'),
  Newsletter = require('./Newsletter.js');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  newsletters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Newsletter' }],
});

module.exports = mongoose.model('Category', categorySchema);
