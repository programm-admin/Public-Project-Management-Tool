const express = require("express");
const {
  uploadFiles,
  uploadSingleFile,
  downloadFile,
  getFilesForProject,
} = require("../controllers/fileController");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config");
const upload = multer({ storage });

router.post("/multiple-files", upload.array("files"), uploadFiles);
router.post("/single-file", upload.array("files"), uploadSingleFile);
router.get("/download", downloadFile);
router.post("/files", getFilesForProject);

module.exports = router;
