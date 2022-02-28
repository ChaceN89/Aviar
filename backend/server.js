//entry point to server
console.log("Aviar server.js running");


const connectDB = require('./config/db'); // require the db file to acces mongodb

const express = require('express'); // get express
const dotenv = require('dotenv').config(); // use dotenv to load environment variables from .env file.
const{errorHandler} = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000; // or 8000 if the enviroment variable in .env isn't found
const app = express();



console.log("End of server.js code");