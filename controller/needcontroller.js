const need = require("../model/needModel");
const catchasync = require("../utilis/catchAsync");
const appError = require("../utilis/appError");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const image = require("../utilis/uploadimg");
exports.uploadUserImage = image.uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = catchasync(async (req, res, next) => {
  const filename = `need-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/need/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});
exports.getAllneed = catchasync(async (req, res, next) => {
  const needs = await need.find();
  if (!needs) {
    return next(new appError("no needs found", 401));
  }

  res.status(200).json({
    status: "succes",
    needs: needs,
  });
});
exports.addneed = catchasync(async (req, res, next) => {
  const newneed = await need.create(req.body);
  if (!newneed) {
    return next(new appError("no needs found", 401));
  }

  res.status(201).json({
    status: "succes",
    need: newneed,
  });
});
exports.deleteneed = catchasync(async (req, res, next) => {
  const needs = await need.findByIdAndDelete(req.params.id);
  if (!needs) {
    return next(new appError("no needs found", 401));
  }

  res.status(204).json({
    status: "success",
    message: "need has been deleted",
  });
});
exports.updateneed = catchasync(async (req, res, next) => {
  const needs = await need.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!needs) {
    return next(new appError("no needs found", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      needs,
    },
  });
});
