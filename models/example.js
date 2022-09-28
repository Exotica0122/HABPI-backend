const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

module.exports = Example = mongoose.model("example", ExampleSchema);
