const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true
    },
    name: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}); 
module.exports = mongoose.model('book', bookSchema);