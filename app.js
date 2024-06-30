const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//to parse incoming request bodies
const bodyParser = require('body-parser');
//db configuration
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://PMO:P@ssw0rd@clusterpm0.hw7qq7o.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPM0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
/*
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas URI
const dbURI = 'mongodb+srv://PMO:P@ssw0rd@clusterpm0.hw7qq7o.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPM0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
 // Start your server or any other application logic here
.catch((err) => {
  console.error('Error connecting to MongoDB:...', err.message);
}); */

/*const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongodb hosted on AWS by mLab
mongoose.connect('mongodb://Hari615:Hari_416@ds117199.mlab.com:17199/task-management')
   .then(() => console.log('connection successful'))
   .catch((err)=> console.error(err));
*/
let app = express();
let port = process.env.PORT || 3000;
let tasks = require('./routes/tasks');
let homePage = require('./routes/home-page');
//view engine set up
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
//middleware set up
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use('/', homePage);
app.use('/tasks',tasks);


app.listen(port,()=>{
  console.log(`server listening on port ${port}` );
});
