const express = require('express');
const app = express();
const Review = require('../models/review')


// NEW Comment
app.get('/admin', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('admin', { reviews: reviews });
    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = app;
