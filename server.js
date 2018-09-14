// INITIAL STATE
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Initialize bodyParser//
var mongoose = require('mongoose');


// Parser and handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT


 require('./controllers/reviews.js')(app);


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
