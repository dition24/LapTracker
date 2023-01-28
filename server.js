// dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const tracksRouter = require("./controllers/tracks");
const carsRouter = require("./controllers/cars");
const usersRouter = require("./controllers/users");

// initialize the application
const app = express();

// configure settings
require("dotenv").config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// establish connection to mongodb
mongoose.set("strictQuery", true);
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("Connected to MongoDB");
});

db.on("error", (error) => {
    console.log("An error occurred with MongoDB: " + error.message);
});

// mount middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUnitialized: false
// }));

// mount router
app.get("/", (req, res) => res.render("home.ejs"));

app.use(usersRouter);
app.use(tracksRouter);
// app.use(carsRouter);


// tell application to listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});