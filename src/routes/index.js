const bcrypt = require('bcrypt');
const validator = require("email-validator");
const bodyParser = require('body-parser')


const { Router } = require("express");
const router = Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

router.get("/", async (req, res) => {
    res.render("index");
});

router.get("/create", async(req, res) =>{
    res.render("create");
});

module.exports = router;
