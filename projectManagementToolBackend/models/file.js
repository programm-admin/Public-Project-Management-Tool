const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  originalName: String,
  accountID: String,
  projectID: String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
