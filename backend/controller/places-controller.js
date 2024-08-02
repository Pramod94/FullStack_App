const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
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

exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;