const donorcontroller = require("../controller/donorController");
const express = require("express");
const Router = express.Router();
Router.route("/")
  .get(donorcontroller.getAllDonor)
  .post(
    donorcontroller.uploadUserImage,
    donorcontroller.resizeImage,
    donorcontroller.addDonor
  );
Router.route("/:id")
  .delete(donorcontroller.deleteDoner)
  .patch(donorcontroller.updateDoner);

module.exports = Router;
