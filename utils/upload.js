const multer = require("multer")
const path = require("path")
const { v4: uuid } = require("uuid")


const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, uuid() + path.extname(file.originalname));
    },
    destination: (req, file, cb) => cb(null, "uploads"),
  });
exports.uploadProfile = multer({ storage: profileStorage }).single("avatar")