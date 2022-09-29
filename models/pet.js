const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    }
});

module.exports = Example = mongoose.model("Pet", PetSchema);
