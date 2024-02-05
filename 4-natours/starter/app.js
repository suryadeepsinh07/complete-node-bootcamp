const express = require('express');
const morgan = require('morgan');
const tourRouter = require(`${__dirname}/Routes/tourRoutes`);
const userRouter = require(`${__dirname}/Routes/userRoutes`);
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());


//All Methods

//----------------Adding route to all methods---------------------

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app