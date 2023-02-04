const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// INDUCES

// Index
router.get("/cars", (req, res) => {
    Car.find({createdBy: req.session.userId}, (error, allCars) => {
        res.render("carIndex.ejs", {
            cars: allCars,
        });
    });
});

// New
router.get("/cars/new", (req, res) => {
    res.render("newCar.ejs");
});

// Delete
router.delete("/cars/:id", (req, res) => {
    Car.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/cars");
    });
});

// Update
router.put("/cars/:id", (req, res) => {
    Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedCar) => {
            res.redirect(`/cars/${req.params.id}`)
        }
    )
});

// Create
router.post("/cars", (req, res) => {
    req.body.createdBy = req.session.userId;
    Car.create(req.body, (error, createdCar) => {
        res.redirect("/cars");
    });
});

// Edit
router.get("/cars/:id/edit", (req, res) => {
    Car.findById(req.params.id, (error, foundCar) => {
        res.render("editCar.ejs", {
            car: foundCar,
        });
    });
});

// Show
router.get("/cars/:id", (req, res) => {
    Car.findById(req.params.id, (error, foundCar) => {
        res.render("showCar.ejs", {
            car: foundCar,
        });
    });
});

module.exports = router;