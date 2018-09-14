// MODEL
const mongoose = require("mongoose");
const reviewSchema = new Schema({
    title: String,
    description: String,
    movieTitle: String,
    Rating: Number
});
module.exports = mongoose.model('Review', ReviewSchema);
