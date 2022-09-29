const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    user: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    minPrice:{
        type: Number,
        required: true
    },
    maxPrice:{
        type: Number,
        required: true
    }

});

module.exports = Example = mongoose.model("Service", ServiceSchema);
