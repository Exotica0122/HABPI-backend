const express = require("express");
const router = express.Router();

const petController = require("../controllers/pet-controller");

router.get("/", petController.getPet);
router.get("/:uid", petController.getPetByID);
router.post("/", petController.postPet);
router.put("/:uid", petController.editPet);
router.delete("/:uid", petController.deletePet);

module.exports = router;
