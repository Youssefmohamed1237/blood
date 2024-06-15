const needcontroller = require("../controller/needcontroller");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .post(
    needcontroller.uploadUserImage,
    needcontroller.resizeImage,
    needcontroller.addneed
  )
  .get(needcontroller.getAllneed);
router
  .route("/:id")
  .patch(needcontroller.updateneed)
  .delete(needcontroller.deleteneed);
module.exports = router;
