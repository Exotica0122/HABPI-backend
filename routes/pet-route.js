const express = require("express");
const router = express.Router();

const petController = require("../controllers/pet/pet-controllers");

router.get("/", petController.getPet);
router.post("/", petController.postPet)

module.exports = router;
