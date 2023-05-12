const multer = require("multer");
const moment = require("moment");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, path.join(__dirname, "..") + "/public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      moment().format("YYYYMMDD-hh-mm-ss") + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const allowedType = ["image/png", "image/jpeg", "image/gif"];

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (allowedType.includes(file.mimetype)) {
    cb(null, false);
    return;
  }

  // To accept the file pass `true`, like so:
  cb(null, true);
  return;
  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
}

module.exports = multer({
  storage,
  fileFilter,
});
