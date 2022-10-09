const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "cookiesecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

module.exports = app;
