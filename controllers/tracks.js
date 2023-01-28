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
    });
});

// New
router.get("/tracks/newTrack", (req, res) => {
    res.render("newTrack.ejs");
});

module.exports = router;