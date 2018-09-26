const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

// INDEX route is now in "movies.js"

// NEW REVIEWS
app.get('/movies/:id/reviews/new', (req, res) => {
    Review.find({movieId: req.params.id}).then((movie) => {
        res.render('reviews-new', { movie, movieId: req.params.id});
    });
});

// CREATE
app.post('/movies/:id/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        res.redirect(`reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

// SHOW
app.get('/movies/:id/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
            // respond with the template with both values
            res.render('reviews-show', { review: review, comments: comments })
        });
    }).catch((err) => {
        // catch errors
        console.log(err.message);
    });
});

// EDIT
app.get('/movies/:id/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
});

// UPDATE
app.put('/movies/:id/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message);
    });
});

// DELETE
app.delete('/movies/:id/reviews/:id', function (req, res) {
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
});

// Export to server.js
module.exports = app;
