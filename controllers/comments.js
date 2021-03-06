const express = require('express');
const app = express();
const Comment = require('../models/comment.js');

// CREATE Comment
app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        res.status(200).send({ comment: comment });
    }).catch((err) => {
        res.status(400).send({ err: err });
    });
});

// DELETE Comment
app.delete('/reviews/comments/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.status(200).send(comment);
    }).catch((err) => {
        console.log(err.message);
        res.status(400).send(err);
    });
});

module.exports = app;
