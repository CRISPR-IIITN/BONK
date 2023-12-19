const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rooms = require('./routes/rooms');
const users = require('./routes/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/hostel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// for testing purpose only
// allow CORS, so that backend and frontend could be put on different servers
// basically to run react app and be able to test with this api
app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/rooms', rooms);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));