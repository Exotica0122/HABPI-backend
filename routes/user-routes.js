const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user/user-controllers");

router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.getUserById);
router.get("/:uid/all-pets", usersController.getAllPetsByUserId);
router.put("/:uid/remove-pet",usersController.removePetFromUserById);
router.put("/:uid", usersController.updateUserById);
router.post("/:uid/add-pet", usersController.addPetToUser);
router.post("/login", usersController.postLogin);
router.post("/signup", usersController.postSignUp);


module.exports = router;
