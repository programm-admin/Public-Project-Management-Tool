const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    TASK_title: { type: String, required: true },
    TASK_description: { type: String, required: true },
    TASK_id: { type: String, required: true },
    TASK_start: { type: Date, required: true },
    TASK_end: { type: Date, required: true },
    TASK_duration: { type: Number, required: true },
    TASK_lastModified: { type: Date, required: true },
    TASK_Members: [String],
    TASK_ticketNumber: { type: String, required: false },
});

const projectSchema = new mongoose.Schema({
    PROJECT_title: { type: String, required: true },
    PROJECT_description: { type: String, required: false },
    PROJECT_id: { type: String, required: true },
    PROJECT_start: { type: Date, required: true },
    PROJECT_end: { type: Date, required: true },
    PROJECT_duration: { type: Number, required: true },
    PROJECT_lastModified: { type: Date, required: true },
    PROJECT_customer: { type: String, required: false },
    PROJECT_ticketNumber: { type: String, required: false },
    PROJECT_tasks: [taskSchema],
    PROJECT_owner: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
