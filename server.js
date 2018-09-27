// INITIAL STATE
if (!process.env.PORT) {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Port uses 3000 or environment port

// REQUIRE MODELS
const Review = require('./models/review.js');
const Comment = require('./models/comment.js');

// REQUIRE CONTROLLERS
const reviewsControllers = require('./controllers/reviews.js');
const moviesControllers = require('./controllers/movies.js');
const commentsControllers = require('./controllers/comments.js');
const adminControllers = require('./controllers/admin.js');

// MONGOOSE
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/rotten-potatoes";


// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT
app.use(express.static(__dirname + '/public'));

// Access controllers
app.use(reviewsControllers);
app.use(moviesControllers);
app.use(commentsControllers);
app.use(adminControllers);

// Use Mongoose URI
mongoose.connect( mongoUri, { useNewUrlParser: true });

// Listen
app.listen(port, () => {
    console.log('App listening on port ' + port);
});
