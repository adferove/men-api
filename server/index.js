const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const error = require('./api/v1/middleware/error.js');

// Routes
const bootcamps = require('./api/v1/routes/bootcamps.js');

const connectDB = require('../conf/db.js');

//Load env variables
dotenv.config({ path: path.resolve(__dirname, '../conf/conf.env') });

connectDB();

const app = express();

//Body parser
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamps);

app.use(error);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`);
  //Close server
  server.close(() => process.exit(1));
});
