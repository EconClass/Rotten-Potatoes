// INITIAL STATE
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Port uses 3000 or environment port
const mongoose = require('mongoose');
const Review = require('./models/review.js');
const reviewsControllers = require('./controllers/reviews.js');
const Comment = require('./models/comment.js');
const commentsControllers = require('./controllers/comments.js');
const moviesControllers = require('./controllers/movies.js');

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT

app.use('/', reviewsControllers);
app.use(moviesControllers);
app.use(commentsControllers);

// URI Mongoose
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/rotten-potatoes";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

// Listen
app.listen(port, () => {
    console.log('App listening on port ' + port);
});
