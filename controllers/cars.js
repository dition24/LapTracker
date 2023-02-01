const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// INDUCES

// Index
router.get("/cars", (req, res) => {
    Car.find({}, (error, allCars) => {
        res.render("carIndex.ejs", {
            cars: allCars,
        });
    });
});

module.exports = router;