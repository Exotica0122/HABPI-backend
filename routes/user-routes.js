const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user/user-controllers");

router.get("/", usersController.getAllUsers);
router.put("/:uid", usersController.updateUserById);
router.post("/login", usersController.postLogin);
router.post("/signup", usersController.postSignUp);

module.exports = router;
