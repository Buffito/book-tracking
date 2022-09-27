const { Router } = require("express");
const router = Router();

const bcrypt = require('bcrypt');
const validator = require("email-validator");

router.get("/", async (req, res) => {
    res.render("index");
});

router.get("/create", async(req, res) =>{
    res.render("create");
});

router.get("/skip-to-list", async (req, res) => {
    res.render("book-list", {
        username : 'teo',
    });
});


module.exports = router;
