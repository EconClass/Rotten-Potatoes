const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

// CREATE Comment
app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
        console.log(err.message);
    });
});

// DELETE Comment
app.delete('/reviews/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
        console.log(err.message);
<<<<<<< HEAD
    })
})
=======
    });
});
>>>>>>> movies

module.exports = app;
