const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
//listing to the App
dotenv.config({ path: './confing.env' });
const DB = processl.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParserr: true,
    userCreateIndex: true,
    UseFindAndModify: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection is successful');
  });

// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listing to port ${port}...`);
});
