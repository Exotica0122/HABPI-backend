const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    pets: [{ type: Schema.Types.ObjectId, required: true, ref: "Pet" }],
    services: [
        { type: Schema.Types.ObjectId, required: true, ref: "Service" },
    ],
});

module.exports = Example = mongoose.model("User", UserSchema);
