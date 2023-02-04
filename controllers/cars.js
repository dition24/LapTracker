const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const cloudinary = require("cloudinary").v2;

// INDUCES

// Index
router.get("/cars", (req, res) => {
    Car.find({createdBy: req.session.userId}, (error, allCars) => {
        res.render("cars/index.ejs", {
            cars: allCars,
        });
    });
});

// New
router.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
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
    const img = req.files.img;
    img.mv(`./uploads/${img.name}`);
    
    cloudinary.uploader.upload(`./uploads/${img.name}`, (err, result) => {
        console.log(err, result);
    });

    Car.create(req.body, (error, createdCar) => {
        res.redirect("/cars");
    });
});

// Edit
router.get("/cars/:id/edit", (req, res) => {
    Car.findById(req.params.id, (error, foundCar) => {
        res.render("cars/edit.ejs", {
            car: foundCar,
        });
    });
});

// Show
router.get("/cars/:id", (req, res) => {
    Car.findById(req.params.id, (error, foundCar) => {
        res.render("cars/show.ejs", {
            car: foundCar,
        });
    });
});

module.exports = router;