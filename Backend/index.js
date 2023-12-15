const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rooms = require('./routes/rooms');

const app = express();

// for testing purpose only
// allow CORS, so that backend and frontend could be put on different servers
// basically to run react app and be able to test with this api
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/rooms', rooms);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));