// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

// DATABASE
require('./config/database');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));

// ROUTES

// Landing Page
app.get('/', (req, res, next) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
