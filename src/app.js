const express = require('express');
const path = require('path');
const morgan = require("morgan");

const routes = require('./routes/index');

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app;