// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

// DATABASE
require('./config/database');

const Fruit = require('./models/fruit.js');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// ROUTES

// Landing Page
app.get('/', (req, res, next) => {
  res.render('index.ejs');
});

// Fruits
app.get('/fruits/new', (req, res, next) => {
  res.render('fruits/new.ejs');
});

app.post('/fruits', async (req, res, next) => {
  // first make sure that the data from the checkbox
  // is a boolean, by overwriting the req.body.isReadyToEat
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // inser the req body into the database
  await Fruit.create(req.body);
  res.redirect('/fruits/new');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
