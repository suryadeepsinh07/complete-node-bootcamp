const dotenv = require('dotenv');
//listing to the App
dotenv.config({ path: './confing.env' });
const app = require('./app');
// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listing to port ${port}...`);
});
