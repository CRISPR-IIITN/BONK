const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rooms = require('./routes/rooms');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/rooms', rooms);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));