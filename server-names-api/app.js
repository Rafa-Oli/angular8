const mongoose = require("mongoose");
const Person = require("./person");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });

app.get("/", (req, res) => {
  Person.find({})
    .lean()
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ error: err, message: err.message });
      }

      return res.status(200).json(data);
    });
});

app.use(function (req, res, next) {
  res.status(404).send("Route does not exist");
});
