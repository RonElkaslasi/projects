const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    require: true,
    unique: true,
  },
  published: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
