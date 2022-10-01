const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const validator = require("email-validator");

const user = require("../models/user");
const book = require("../models/book");

var loggedUser = "";

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/goToRegister", async (req, res) => {
  renderView("register", res, "");
});

router.post("/authenticateUser", async (req, res) => {
  let authEmail = req.body.email;
  let authPassword = req.body.password;

  if (emailExists()) {
    if(req.body.remember){
      // add cookie 
    }
    let hashedPassword = await bcrypt.compare(authPassword, authUser.password);
    if (hashedPassword) {
      loggedUser = authUser.username;
      res.render("book-list", {
        username: loggedUser,
      });
    }
  } else {
    renderView("register", res, "");
    // add authentication error
  }
});

router.post("/registerUser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  let regUsername = req.body.username;
  let regPassword = await bcrypt.hash(req.body.password, salt);
  let regEmail = "";

  if (validator.validate(req.body.email)) regEmail = req.body.email;
  else renderView("register", res, "Email was not valid!");

  let regUser = new user({
    username: regUsername,
    password: regPassword,
    email: regEmail,
  });

  if (!emailExists()) {
    try {
      await regUser.save();
      loggedUser = regUsername;
      res.render("book-list", {
        username: loggedUser,
      });
    } catch (err) {
      renderView("register", res, "User was not created :(");
    }
  } else {
    renderView("register", res, "User already exists!");
  }
});

router.get("/goToAdd", async (req, res) => {
  res.render("add-book");
});

router.post("/addBook", async (req, res) => {
  res.render("add-book");
});

router.get("/skip-to-list", async (req, res) => {
  res.render("book-list", {
    username: "teo",
  });
});

function renderView(viewName, res, message) {
  res.render(viewName, {
    message: message,
  });
}

async function emailExists(){
  let authUser = await user.findOne({
    email: regEmail,
  });

  return authUser;
}

module.exports = router;
