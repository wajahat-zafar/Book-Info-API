const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

const reviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    reviewText: String,
    rating: Number
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
