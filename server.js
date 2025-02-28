// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');

// DATABASE
require('./config/database');

const Fruit = require('./models/fruit.js');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

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
  res.redirect('/fruits');
});

app.get('/fruits', async (req, res, next) => {
  const fruits = await Fruit.find();

  res.render('fruits/index.ejs', { fruits });
});

app.get('/fruits/:fruitId', async (req, res, next) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render('fruits/show.ejs', { fruit });
});

app.delete('/fruits/:fruitId', async (req, res, next) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect('/fruits');
});

app.get('/fruits/:fruitId/edit', async (req, res, next) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render('fruits/edit.ejs', { fruit });
});

app.put('/fruits/:fruitId', async (req, res, next) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
