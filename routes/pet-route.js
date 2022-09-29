const express = require("express");
const router = express.Router();

const petController = require("../controllers/pet-controller");

router.get("/", petController.getPet);
router.post("/", petController.postPet)
router.put("/:uid",petController.editPet)

module.exports = router;
