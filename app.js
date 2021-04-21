const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./src/database/database").connect();
app.use(routes);

app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to our construction company",
  });
});

module.exports = app;
