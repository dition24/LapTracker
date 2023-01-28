const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
    res.render("signup.ejs", {error: null});
});

router.get("/login", (req, res) => {
    res.render("login.ejs", {error: null});
});

module.exports = router;