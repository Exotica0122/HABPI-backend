const express = require("express");
const router = express.Router();

const petController = require("../controllers/pet/pet-controllers");

router.get("/", petController.getAllPets);
router.get("/:pid", petController.getPetByID);
router.post("/", petController.createPet);
router.put("/:pid", petController.editPetId);
router.delete("/:pid", petController.deletePet);

module.exports = router;
