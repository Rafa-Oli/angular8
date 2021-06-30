const mongoose = require("mongoose");
const faker = require("faker");
const Person = require("./person.js");

mongoose.connect("mongodb://localhost:27017/namesdb");
