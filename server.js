const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();


// Route files  
const bootcamps = require('./routes/bootcamps');


const app = express();

// app.use(logger);
// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    });

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});