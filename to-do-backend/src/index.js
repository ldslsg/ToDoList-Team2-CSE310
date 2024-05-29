const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


// Server host name and port
const HOST = 'localhost';
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running and listening on ${HOST}:${PORT}`);
});
