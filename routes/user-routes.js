const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user/user-controllers");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.postSignUp);

module.exports = router;
