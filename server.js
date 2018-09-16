// INITIAL STATE
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Initialize bodyParser//
const mongoose = require('mongoose');
const Review = require('./models/review');
const reviews_controllers = require('./controllers/reviews.js');
// const Comment = require('./models/comment.js');
// const comments_controllers = require('./controllers/comments.js');

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT

// URI Mongoose
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/rotten-potatoes";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

// Listen
app.listen(port, () => {
    console.log('App listening on port 3000!');
});

module.exports = app;
