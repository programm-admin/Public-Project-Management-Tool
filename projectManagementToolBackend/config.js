const path = require("path");

// Multer Storage-Konfiguration
const storage = require("multer").diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("file:", file);
    // console.log("req body", req.body);
    // const extension = path.extname(file.originalname);
    const newFilename = file.originalname;
    cb(null, newFilename);
  },
});

module.exports = {
  storage,
};
