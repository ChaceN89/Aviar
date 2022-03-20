//entry point to server
console.log("Aviar server.js running");

const colors= require('colors');
const connectDB = require('./config/db'); // require the db file to acces mongodb
connectDB(); //set up a donnection to the database 

//set up values to sue in server
const express = require('express'); // get express
const dotenv = require('dotenv').config(); // use dotenv to load environment variables from .env file.
const{errorHandler} = require('./middleware/errorMiddleware'); // my errorhandler system that replaces the defualt

const port = process.env.PORT || 8000; // or 8000 if the enviroment variable in .env isn't available
const app = express(); // app represents express stuff
app.use(express.json()); // very important to parse requests from Post, Get etc
app.use(express.urlencoded({extended: false})); // need this for the type coming accross 

//routes/endpoints
app.use('/api/users', require('./routes/userRoutes')); // all user routes

app.use(errorHandler); // override default error handlers

//listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, ()=> console.log("server started on http://localhost:" + port .blue.bold));

console.log("Server is Active".blue.bold);