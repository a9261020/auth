const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post("/signup", (req, res, next) => {
  console.log(req);
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`server is running onr port ${port}`);
});
