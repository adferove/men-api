const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config({ path: path.resolve(__dirname, './conf/conf.env') });

//Load models
const Bootcamp = require('./server/api/v1/models/Bootcamp.js');
const Course = require('./server/api/v1/models/Course.js');

//Connect to database
const connectDB = require('./conf/db.js');

connectDB();

//Read JSON Files

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const importData = () => {
  Bootcamp.create(bootcamps).then((data) => {
    console.log('Bootcamps created');
    Course.create(courses).then((courseData) => {
      console.log('Courses created');
      process.exit(1);
    });
  });
};

const deleteData = () => {
  Bootcamp.deleteMany().then((data) => {
    console.log('Bootcamps deleted');
    Course.deleteMany().then((courseData) => {
      console.log('Courses deleted');
      process.exit(1);
    });
  });
};

if (process.argv[2] === '--i') {
  importData();
} else if (process.argv[2] === '--d') {
  deleteData();
}
