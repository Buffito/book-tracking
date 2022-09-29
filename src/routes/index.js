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

router.get("/create", async (req, res) => {
  renderView("create", res, "");
});

router.post("/auth", async (req, res) => {
  let authEmail = request.body.email;
  let authPassword = request.body.password;

  let authUser = await user.findOne({
    email: authEmail,
  });

  if (authUser) {
    let hashedPassword = await bcrypt.compare(authPassword, authUser.password);
    if (hashedPassword) {
      loggedUser = authUser.username;
      res.render("book-list", {
        username: loggedUser,
      });
    }
  } else {
    renderView("create", res, "");
  }
});

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  let regUsername = req.body.username;
  let regPassword = await bcrypt.hash(req.body.password, salt);
  let regEmail = "";

  if (validator.validate(req.body.email)) regEmail = req.body.email;
  else renderView("create", res, "Email was not valid!");

  let regUser = new user({
    username: regUsername,
    password: regPassword,
    email: regEmail,
  });

  let authUser = await user.findOne({
    email: regEmail,
  });
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

module.exports = router;
