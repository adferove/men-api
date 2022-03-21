const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const bootcamps = require('./api/v1/routes/bootcamps.js');

//Load env variables
dotenv.config({ path: path.resolve(__dirname, '../conf/conf.env') });

const app = express();
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
