const mongoose = require('mongoose');

const ContactsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  label: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  source: {
    type: String
  },
  url: {
    type: String
  },
  calories: {
    type: Number
  },
  ingredientLines: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('contact', ContactsSchema);
