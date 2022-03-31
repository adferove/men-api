const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');
const error = require('./api/v1/middleware/error.js');
const cookieParser = require('cookie-parser');

//Load env variables
dotenv.config({ path: path.resolve(__dirname, '../conf/conf.env') });

// Routes
const bootcamps = require('./api/v1/routes/bootcamps.js');
const courses = require('./api/v1/routes/courses.js');
const auth = require('./api/v1/routes/auth.js');

const connectDB = require('../conf/db.js');

connectDB();

const app = express();

//Body parser
app.use(express.json());
//Cookie parser
app.use(cookieParser());
//File upload
app.use(fileUpload());
//Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

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
