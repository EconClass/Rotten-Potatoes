// INITIAL STATE
const express = require('express')
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const bodyParser = require('body-parser'); // Initialize bodyParser

// MODEL
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    Rating: Number
});

// Parser and handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// Listen
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

// OUR MOCK ARRAY OF PROJECTS
var reviews = [
    { title: "Great Review" },
    { title: "Previous Review"},
    { title: "Next Review" }
];

// INDEX
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
        console.log(err);
    })
});

// NEW REVIEWS
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
})
