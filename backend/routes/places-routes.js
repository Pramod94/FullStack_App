const express = require("express");
const placesController = require("../controller/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlacesById);

router.get("/user/:uid", placesController.getPlacesByUserId);

module.exports = router;
