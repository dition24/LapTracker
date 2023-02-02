const express = require("express");
const router = express.Router();
const Track = require("../models/track");
const Car = require("../models/car");

// INDUCES

// Index
router.get("/tracks", (req, res) => {
    Track.find({})
    .populate("car")
    .exec((error, allTracks) => {
        res.render("trackIndex.ejs", {
            tracks: allTracks,
        });
    });
});

// New
router.get("/tracks/newTrack", (req, res) => {
    Car.find({}, (error, allCars) => {
        res.render("newTrack.ejs", { allCars });
    });
});

// Delete
router.delete("/tracks/:id", (req, res) => {
    Track.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/tracks");
    });
});

// Update
router.put("/tracks/:id", (req, res) => {
    Track.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedTrack) => {
        res.redirect("/tracks/" + req.params.id);
    });
});

// Create
router.post("/tracks", (req, res) => {
    Track.create(req.body, (error, createdTrack) => {
        res.redirect("/tracks");
    });
});

// Edit
router.get("/tracks/:id/edit", (req, res) => {
    Track.findById(req.params.id, (error, foundTrack) => {
        res.render("editTrack.ejs", {
            track: foundTrack,
        });
    });
});

// Show
router.get("/tracks/:id", (req, res) => {
    Track.findById(req.params.id)
    .populate("car")
    .exec((error, foundTrack) => {
        res.render("showTrack.ejs", {
            track: foundTrack
        });
    });
});

module.exports = router;