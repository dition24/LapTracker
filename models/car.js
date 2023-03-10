const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    year: { type: Number },
    make: { type: String },
    model: { type: String },
    img: { type: String },
    notes: { type: String },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Car", carSchema);

/*
Model.create()
Model.findById()
Model.findByIdAndUpdate()
Model.findByIdAndDelete()
Model.findOne()
Model.findOneAndUpdate()
Model.findOneAndDelete()
*/