//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config();
const Scp = require('./models/scp.js');
const users = require('./controllers/users_constroller.js')
const sessions = require('./controllers/sessions_controllers.js')
require('express-session')
const session = require('express-session')
app.use(session({
      secret: "feedmeseymour", //a random string do not copy this value or your stuff will get hacked
      resave: false,
      saveUninitialized: false
}));
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use('/users', users);
app.use('/sessions', sessions)

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render('intro.ejs');
});

app.get('/scp/new', (req, res) => {
  res.render('new.ejs');
});

app.get('/scp', (req, res) => {
  Scp.find({}, (error, allScp) => {
    res.render('index.ejs', {
      scp: allScp
    });
  })
})

app.get('/scp/:id/edit', (req, res) => {
  Scp.findById(req.params.id, (error, foundScp) => {
    res.render('edit.ejs', {
      scp: foundScp
    })
  })
})

app.put('/scp/:id', (req, res) => {
  Scp.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    res.redirect('/scp')
  })
})

app.get('/scp/:id', (req, res) => {
  Scp.findById(req.params.id, (error, foundScp) => {
    res.render('show.ejs', {
      scp:foundScp
    })
    console.log(req.params.id);
  })
})

app.delete('/:id', (req, res) => {
  Scp.findByIdAndRemove(req.params.id, (error, deletedScp) => {
    res.redirect('/scp');
  })
})

app.post('/scp', (req, res) => {
  Scp.create(req.body, (error, createdScp) => {
    res.redirect('/scp')
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
