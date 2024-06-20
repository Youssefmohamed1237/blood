const placecontroller = require("../controller/placecontroller");
const express = require("express");
const Router = express.Router();
Router.route("/")
  .get(placecontroller.getAllPlaces)
  .post(
    placecontroller.uploadplaceImage,
    placecontroller.resizeImage,
    placecontroller.addplace
  );
Router.route("/:id")
  .delete(placecontroller.deleteplace)
  .patch(placecontroller.updateplace);

module.exports = Router;
