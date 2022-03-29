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

//file upload
const fileupload =require('express-fileupload');
app.use(fileupload())

//routes/endpoints
app.use('/api/users', require('./routes/userRoutes')); // all user routes
app.use('/api/posts', require('./routes/postRoutes')); // all Post routes
app.use('/api/collections', require('./routes/collectionRoutes')); // all collection routes

app.use(errorHandler); // override default error handlers

const path = require('path')
//serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    
    app.get('*', (req, res) =>
        res.sendFile( // point to index.html if not user made routes
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )

}else{
    app.get('/', (req, res) => res.send('Please set to production'))
}


//listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, ()=> console.log("server started on http://localhost:" + port));

console.log("Server is Active".blue.bold);