const express = require('express');
const bodyParser = require("body-parser");
const test = require("./routes/user.routes");

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', test);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})