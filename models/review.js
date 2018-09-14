// MODEL
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    title: String,
    description: String,
    movieTitle: String,
    Rating: Number
});
module.exports = mongoose.model('Review', reviewSchema);
