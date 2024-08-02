const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");

const app = express();

// This will convert the incoming data to JSON format. i.e incoming data from POST request etc
app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

// This will be triggerd when none of the routes matches to handle the unsupported routes
// Do make sure the ORDER in which we call the routes matters
app.use((req, res, next) => {
  throw new HttpError("Could Not find this route", 404);
});

// This will trigger if any of the routes will land in error
app.use((error, req, res, next) => {
  // This will ensure that the response was sent, so no need to set error response
  if (res.headerSent) {
    next(error);
  }
  // Here setting the error code which is recived from the error object or else setting to 500
  res.status(error.code || 500);
  // Constructing the error message
  res.json({ message: error.message || "Unknown error occured...!!!" });
});

app.listen(5000);
