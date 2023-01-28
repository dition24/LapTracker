const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("User", userSchema);

/*
Model.create()
Model.findById()
Model.findByIdAndUpdate()
Model.findByIdAndDelete()
Model.findOne()
Model.findOneAndUpdate()
Model.findOneAndDelete()
*/