const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
const MovieDb = require('moviedb-promise');
const API_Key = process.env.API_KEY;
const moviedb = new MovieDb(API_Key);

// INDEX
app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
        res.render('movies-index', { movies: response.results });
    }).catch(console.error);
});

// SHOW Movies with Reviews and Comments
app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
        if (movie.video) {
            moviedb.movieVideos({ id: req.params.id }).then(videos => {
                movie.trailer_youtube_id = videos.results[0].key
                renderTemplate(movie);
            });
        } else {
            renderTemplate(movie);
        };

        function renderTemplate(movie)  {
            Review.find({ movieId: req.params.id }).then(reviews => {
                res.render('movies-show', { movie: movie, reviews: reviews });
            });
        };
    }).catch(console.error);
});

module.exports = app;
