const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// sign up
router.get("/signup", (req, res) => {
    res.render("signup.ejs", {error: null});
});

router.post("/signup", (req, res) => {
    let error = null;
    console.log(req.body);

    if(req.body.password !== req.body.passwordConf) {
        error = "password and password confirmation do not match";
        return res.render("signup.ejs", { error })
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    req.body.password = hashedPassword;

    User.create(req.body, (err, newUser) => {
        req.session.userId = newUser._id;
        res.redirect("/tracks");
    });
});

// log in
router.get("/login", (req, res) => {
    res.render("login.ejs", {error: null});
});

router.post("/login", (req, res) => {
    const error = "bad credentials";
    User.findOne({ userName: req.body.userName }, (err, foundUser) => {
        if(!foundUser) {
            return res.render("login.ejs", {error});
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render("login.ejs", {error});
        }
        req.session.userId = foundUser._id;
        res.redirect("/tracks");
    });
});

// log out
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/login");
    });
});

module.exports = router;