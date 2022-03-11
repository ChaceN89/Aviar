const mongoose = require('mongoose'); // should be installed in package.JSon

const colors= require('colors'); // can use this anywhere since its in the servee,.js file
const dotenv = require('dotenv').config(); // need for using process.env.MONGO_URI
// not sure why this isn't just imported from server.js but this currently works


var startTime = performance.now()

    


const connectDB = async() => {
    console.log("Connecting to MongoAtlas database with mongoose".grey.underline);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // connect to databse using connection stirng in .env
        console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline); // last part if from colors package to make it easier
        var endTime = performance.now()

        console.log(`Call to Database took ${endTime - startTime} milliseconds`.cyan.underline); // time call

    } catch (error) {
            console.log("---------------------ABOUT TO GET ERRORS MESSAGE-------------");
            console.log(error);
            process.exit(1);
            console.log("---------------------shouldn't get here-------------");
    }
} //end fucntiion

module.exports = connectDB;