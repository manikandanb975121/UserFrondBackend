const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join('backend/ProfileImage'));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    callback(null, file.originalname);
  }
});

var uploadFiles = multer({ storage: storage }).array("profile_pic");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;