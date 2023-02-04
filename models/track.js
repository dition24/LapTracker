const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: {type: String},
    location: {type: String},
    lapTime: {type: String},
    car: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Car"
    },
    img: {type: String},
    date: {type: String},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Track", trackSchema);

/*
Model.create()
Model.findById()
Model.findByIdAndUpdate()
Model.findByIdAndDelete()
Model.findOne()
Model.findOneAndUpdate()
Model.findOneAndDelete()
*/