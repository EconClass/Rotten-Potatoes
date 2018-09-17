const express = require('express');
const app = express();
const Review = require('../models/review.js')
const Comment = require('../models/comment.js')

// CREATE Comment
app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

// SHOW
app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
            // respond with the template with both values
            res.render('reviews-show', { review: review, comments: comments })
        })
    }).catch((err) => {
        // catch errors
        console.log(err.message)
    });
});

module.exports = app;
