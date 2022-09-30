const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/service/service-contollers");

router.get("/", servicesController.getAllService);
router.get("/filter/job-type/:jobtype", servicesController.getServiceByJobType);
router.post("/", servicesController.postService);
router.get("/:sid", servicesController.getServiceById);

module.exports = router;
