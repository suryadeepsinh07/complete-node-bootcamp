const app = require('./app');
//listing to the App
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listing to port ${port}...`);
});
