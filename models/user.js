const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    reuqired: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pets: [{ type: mongoose.Types.ObjectId, required: true, ref: "Pet" }],
  services: [{ type: mongoose.Types.ObjectId, required: true, ref: "Service" }],
});

module.exports = Example = mongoose.model("User", UserSchema);
