const fs = require('fs');
//Get Request (All Data)

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  next();
};
exports.checkPrice =  (req, res, next, val)=>{
    const price= req.param.price
    if(!price)
    {
        return res.status(400)
        .json({
            status:"failed",
            message:"This tour Doesn't contain price "
        })
    }
}
exports.getAlltours = (req, res) => {
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

exports.getTour = (req, res) => {
  //   console.log(req.params);
  const id = req.params.id * 1;
  // if (id > tours.length)
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//Post Request (Creating new tour)
exports.addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
exports.updateTour = (req, res) => {
  res.status(200).json({
    data: {
      tour: '<Updated tour data>',
    },
  });
};

//Delete Request
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
