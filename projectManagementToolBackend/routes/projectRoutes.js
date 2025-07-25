const express = require("express");
const {
  getAllProjectWithoutTasks,
  getAllProjects,
  getCurrentProject,
  createNewProject,
  createNewTask,
  editExistingProject,
  deleteExistingProject,
  editTask,
  getCurrentTask,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/allWithoutTasks", getAllProjectWithoutTasks);
router.get("/", getAllProjects);
router.get("/get-existing", getCurrentProject);
router.get("/get-task", getCurrentTask);
router.post("/new", createNewProject);
router.post("/new-task", createNewTask);
router.put("/edit-existing", editExistingProject);
router.put("/edit-task", editTask);
router.delete("/existing/delete", deleteExistingProject);

module.exports = router;
