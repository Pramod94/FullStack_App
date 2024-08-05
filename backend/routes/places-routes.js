const express = require("express");
const placesController = require("../controller/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlacesById);

router.get("/user/:uid", placesController.getPlacesByUserId);

router.post("/", placesController.createNewPlace);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
