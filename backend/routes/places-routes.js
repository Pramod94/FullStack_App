const express = require("express");
// express-validator is used for the payload validation
const { check } = require("express-validator");
const placesController = require("../controller/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlacesById);

router.get("/user/:uid", placesController.getPlacesByUserId);

router.post("/", placesController.createNewPlace);

// check() method is used to validate the inputs passed as a payload
// It is similar in comparion with the "yup" form validator. Read more in express-validator document
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
