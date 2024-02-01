const express = require('express');
const fs = require('fs');
const morgan = require('morgan');


const app = express();

//Middleware
app.use(morgan('dev'))
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
// app.get('/api/v1/tours', getAlltours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', addTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//----------------Adding route to all methods---------------------
app.route('/api/v1/tours').get(getAlltours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//listing to the App
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listing to port ${port}...`);
});
