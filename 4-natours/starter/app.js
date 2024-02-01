const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get Request (All Data)

const getAlltours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

//Get perticular trip

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    // result: tours.length,
    data: {
      tour,
    },
  });
};

//Post Request (Creating new tour)
const addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (e) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tours,
        },
      });
    }
  );
};

//Patch Method
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    data: {
      tour: '<Updated tour data>',
    },
  });
};

//Delete Request
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

//All Methods

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
const addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
//----------------Adding route to all methods---------------------

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
tourRouter.route('/').get(getAlltours).post(addTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(addUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//listing to the App
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listing to port ${port}...`);
});
