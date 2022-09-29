const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("book", bookSchema);
