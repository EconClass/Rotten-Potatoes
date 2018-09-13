
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// MODEL
module.exports = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    Rating: Number
});
