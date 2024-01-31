const http = require("http");

const app = http.createServer((req, res) => {
  res.end("This is a server");
});

app.listen(3002);
