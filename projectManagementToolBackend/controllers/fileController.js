const { response } = require("express");
const File = require("../models/file");
const fs = require("fs");
const path = require("path");
const { request } = require("http");
const userFiles = "./files/";

const uploadFiles = async (request, response) => {
  const { fileNames, accountID, projectID } = request.body;

  console.log(request.body);

  const files = fileNames.map((fileName) => {
    return new File({
      fileName: `${projectID}----${fileName}`,
      originalName: fileName,
      accountID,
      projectID,
    });
  });

  //   console.log("files list:", files);

  try {
    await File.insertMany(files);
    response.status(200).json({ message: "Files uploaded successfully." });
  } catch (error) {
    console.error(
      "[ERROR POST] error when uploading files from account id:",
      accountID,
      " for project id:",
      projectID
    );
    response.status(500).json({ message: "error when uploading files" });
  }
};

const uploadSingleFile = async (request, response) => {
  const { fileNames, accountID, projectID } = request.body;

  console.log(request.body);

  // if only a single file is uploaded
  const files = new File({
    fileName: `${projectID}----${fileNames}`,
    originalName: fileNames,
    accountID,
    projectID,
  });

  //   console.log("files list:", files);

  try {
    await File.insertMany(files);
    response.status(200).json({ message: "File uploaded successfully." });
  } catch (error) {
    console.error(
      "[ERROR POST] error when uploading files from account id:",
      accountID,
      " for project id:",
      projectID
    );
    response.status(500).json({ message: "error when uploading files" });
  }
};

const getFilesForProject = async (request, response) => {
  const { accountID, projectID } = request.body;

  try {
    const files = await File.find({
      accountID,
      projectID,
    });

    response.status(200).json(files);
  } catch (error) {
    console.error(
      "[ERROR GET] error getting files from account id:",
      accountID,
      " for project id:",
      projectID
    );
    response.status(500).json({ message: "error getting files for project" });
  }
};

const downloadFile = (request, response) => {
  const fileName = request.query["fileName"];

  const filePath = path.join(
    __dirname.split("\\").slice(0, 6).join("\\"),
    "uploads",
    fileName
  );

  console.log("file name:", fileName);

  if (fs.existsSync(filePath)) {
    response.download(filePath, fileName);
  } else {
    console.error(
      "[ERROR GET] error when downloading file with file name:",
      fileName
    );
    response
      .status(404)
      .json({ message: "error when downloading file for project" });
  }
};

module.exports = {
  uploadFiles,
  uploadSingleFile,
  downloadFile,
  getFilesForProject,
};
