const express = require('express');
const morgan = require('morgan');

const tourRouter = require(`${__dirname}/Routes/tourRoutes`);
const userRouter = require(`${__dirname}/Routes/userRoutes`);

const app = express();

// console.log();
//Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello Form middleware');
  next();
});

//All Methods

//----------------Adding route to all methods---------------------

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
