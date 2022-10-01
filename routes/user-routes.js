const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user/user-controllers");

router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.getUserById);
router.get("/:uid/all-pets", usersController.getAllPetsByUserId);
router.get("/:uid/services", usersController.getAllServiceByUserId);
router.put("/:uid", usersController.updateUserById);
router.post("/add-service/:sid", usersController.postAddSerivceToUser);
router.post("/:uid/add-pet", usersController.addPetToUser);
router.post("/login", usersController.postLogin);
router.post("/signup", usersController.postSignUp);

module.exports = router;
