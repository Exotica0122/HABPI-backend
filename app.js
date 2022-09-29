const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// routes
// const example = require("./routes/example-route");
const pet = require("./routes/pet-route");
const user = require("./routes/user-routes");
const service = require("./routes/service-routes");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.use("/", example);
app.use("/user", user);
app.use("/pet", pet);
app.use("/service", service);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
