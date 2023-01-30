const express = require("express");
const router = express.Router();
const Track = require("../models/track");

// INDUCES

// Index
router.get("/tracks", (req, res) => {
    Track.find({}, (error, allTracks) => {
        res.render("trackIndex.ejs", {
            tracks: allTracks,
        });
        console.log(allTracks);
    });
});

// New
router.get("/tracks/newTrack", (req, res) => {
    res.render("newTrack.ejs");
});

// Delete


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
    Track.findById(req.params.id, (error, foundTrack) => {
        res.render("showTrack.ejs", {
            track: foundTrack
        });
    });
});

module.exports = router;