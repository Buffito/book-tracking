const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    message: "",
  });
});


router.get("/goToRegister", (req, res) => {
    res.render("register", {
      message: "",
    });
  });
module.exports = router;
