//entry point to server
console.log("Aviar server.js running");


const connectDB = require('./config/db'); // require the db file to acces mongodb
connectDB(); //set up a donnection to the database 

//set up values to sue in server
const express = require('express'); // get express
const dotenv = require('dotenv').config(); // use dotenv to load environment variables from .env file.
const{errorHandler} = require('./middleware/errorMiddleware'); // my errorhandler system that replaces the defualt

const port = process.env.PORT || 8000; // or 8000 if the enviroment variable in .env isn't available
const app = express();

//routes/endpoints
app.use('/api/users', require('./routes/userRoutes'));


app.use(errorHandler); // override default error handlers

//listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, ()=> console.log("server started on http://localhost:" + port));

console.log("End of server.js code");