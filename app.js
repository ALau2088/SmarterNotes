// import Express Library
const express = require("express");

// File paths module such as joining paths
const path = require('path');

// import express-handlebars
const exphbs = require("express-handlebars");

// import method-override for PUT request
const methodOverride = require('method-override')

const flash = require('connect-flash');
const session = require('express-session');

const bodyParser = require("body-parser");

const passport = require('passport');

const mongoose = require("mongoose");

// create instance of express
const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose
  .connect(
    /* LOCAL DB only
     "mongodb://localhost/vidjot-dev",
    */
    db.mongoURI,
    {
      // useMongoClient: true
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static folder joins current directory to public absolute path. Use the static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables for express-session
app.use(function(req,res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // Logged in or not
  res.locals.user = req.user || null;
  next();
});

// Index Route
// title used in index.handlebars
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about");
});





// Use routes
// Requests for /ideas/* will be sent to ideas router
app.use('/ideas', ideas);
// Requests for /users/* will be sent to users router
app.use('/users', users);

// define port, process.env.PORT for Heroku. Heroku has their own port.
const port = process.env.PORT || 5000;

/*
 start server for listen for events on specified port and executes callback function once the server is running and ready to receive responses
*/
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
