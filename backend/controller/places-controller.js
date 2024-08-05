const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find(({ id }) => id === placeId);

  if (!place) {
    throw new HttpError("Could not find the place for the id", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find(({ creator }) => creator === userId);

  if (!place) {
    return next(new HttpError("Couldn't fidn the place for the user id", 404));
  }

  res.json({ place });
};

const createNewPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const newPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(newPlace);

  res.status(201).json({ place: newPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const place = { ...DUMMY_PLACES.find(({ id }) => id === placeId) };
  place.title = title;
  place.description = description;
  const index = DUMMY_PLACES.findIndex(({ id }) => id === placeId);

  DUMMY_PLACES[index] = place;

  res.status(200).json({ message: "Place Updated", place });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(({ id }) => id !== placeId);
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createNewPlace = createNewPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
