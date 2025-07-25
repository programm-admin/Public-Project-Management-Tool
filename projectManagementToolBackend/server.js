require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "authorization",
            "Method",
            "method",
        ],
    })
);

const pathToFiles = path.join(
    __dirname.split("\\").slice(0, 6).join("\\"),
    "uploads"
);

app.use(express.json());
app.use("/files", express.static(pathToFiles));

mongoose
    .connect("mongodb://localhost:27017/projectManager")
    .then(() => console.log("[DB] connected to MongoDB successfully"))
    .catch((error) =>
        console.error(
            "[DB] error when connecting to MongoDB:",
            JSON.stringify(error)
        )
    );

// routes
app.use("/projects", projectRoutes);
app.use("/user", userRoutes);
app.use("/file", fileRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`[SERVER] server running on port ${PORT}`));
