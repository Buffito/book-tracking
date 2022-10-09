const express = require("express");
const router = express.Router();
const Joi = require("joi");
const passport = require("passport");

const User = require("../models/user");

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

router
  .route("/login")
  .get((req, res) => {
    res.render("index", {
      message: "",
    });
  })
  .post(async (req, res, next) => {
    try {
      const result = loginSchema.validate(req.body);
      if (result.error) {
        res.render("index", {
          message: "Data entered is not valid. Please try again.",
        });
        return;
      }

      const user = await User.findOne({ email: result.value.email });
      if (user) {
        let passwordIsValid = bcrypt.compareSync(
          result.value.password,
          user.password
        );
        if (!passwordIsValid) {
          res.render("index", {
            message: "Email/Password is not valid. Please try again.",
          });
          return;
        }
        let username = user.username;
        res.render("book-list", {
          username: username,
        });
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route("/register")
  .get((req, res) => {
    res.render("register", {
      message: "",
    });
  })
  .post(async (req, res, next) => {
    try {
      const result = userSchema.validate(req.body);
      if (result.error) {
        res.render("register", {
          message: "Data entered is not valid. Please try again.",
        });
        return;
      }

      const user = await User.findOne({ email: result.value.email });
      if (user) {
        res.render("register", {
          message: "Email is already in use.",
        });
        return;
      }

      const hash = await User.hashPassword(result.value.password);

      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await new User(result.value);
      await newUser.save();

      let username = newUser.username;
        res.render("book-list", {
          username: username,
        });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
