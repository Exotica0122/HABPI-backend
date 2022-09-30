const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/service/service-contollers");

router.get("/", servicesController.getAllService);
router.get("/:jobtype", servicesController.getServiceByJobType);
router.post("/", servicesController.postService);

module.exports = router;
