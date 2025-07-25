const Project = require("../models/project");

const getAllProjectWithoutTasks = async (request, response) => {
  const userAccountID = request.query["accountID"];

  console.log("[GET] all projects without tasks");

  // getting all projects from database
  const projects = await Project.find({
    PROJECT_owner: userAccountID,
  });
  const responseProjectList = [];

  if (!projects) {
    return response.status(500).send("No projects found");
  }

  for (let project of projects) {
    // projects without tasks!
    responseProjectList.push({
      PROJECT_title: project.PROJECT_title,
      PROJECT_description: project.PROJECT_description,
      PROJECT_id: project.PROJECT_id,
      PROJECT_start: project.PROJECT_start,
      PROJECT_end: project.PROJECT_end,
      PROJECT_duration: project.PROJECT_duration,
      PROJECT_lastModified: project.PROJECT_lastModified,
      PROJECT_customer: project.PROJECT_customer,
      PROJECT_ticketNumber: project.PROJECT_ticketNumber,
      PROJECT_owner: project.PROJECT_owner,
    });
  }

  response.status(200).json(responseProjectList);
};

const getAllProjects = async (request, response) => {
  console.log("[GET] all projects");

  const projectIDFromURL = request.query["projectID"];
  const accountID = request.query["accountID"];
  const foundProject = await Project.find({
    PROJECT_id: projectIDFromURL,
    PROJECT_owner: accountID,
  });

  if (!foundProject) {
    return response.status(500).send("No project for this id found");
  }

  const foundProjectData = await foundProject;

  response.status(200).json(foundProjectData);
};

const getCurrentProject = async (request, response) => {
  const projectIDFromURL = request.query["projectID"];

  console.log("[GET] current project: with id:", projectIDFromURL);

  const foundProject = await Project.findOne({
    PROJECT_id: projectIDFromURL,
  });

  if (!foundProject) {
    return response.status(500).json({ message: "No project found." });
  }

  const foundProjectData = await foundProject;

  response.status(200).json(foundProjectData);
};

const getCurrentTask = async (request, response) => {
  const projectIDFromURL = request.query["projectID"];
  const taskIDFromURL = request.query["taskID"];

  console.log(
    "[GET] current task: with id:",
    projectIDFromURL,
    " and task id:",
    taskIDFromURL
  );

  const foundProject = await Project.findOne({
    PROJECT_id: projectIDFromURL,
  });

  if (!foundProject) {
    return response.status(500).json({ message: "No project found." });
  }

  const foundProjectData = await foundProject;
  const foundTask = foundProject.PROJECT_tasks.find(
    (task) => task.TASK_id === taskIDFromURL
  );

  if (!foundTask) {
    return response.status(500).json({ message: "No task found." });
  }

  response.status(200).json(foundTask);
};

const createNewProject = async (request, response) => {
  const projectFromRequest = request.body;
  console.log(
    "[POST] create new project: project title:",
    projectFromRequest.PROJECT_title
  );

  // insert project into database
  const responseProject = await Project.insertMany([projectFromRequest]);

  if (!responseProject) {
    return response.status(500).send("Error when inserting new project.");
  }

  response.status(200).json(responseProject);
};

const createNewTask = async (request, response) => {
  const projectIDFromURL = request.query["projectID"];
  const requestBody = request.body;

  console.log(
    "[POST] create new task: project id:",
    projectIDFromURL,
    " and task title:",
    requestBody.TASK_title
  );

  const foundProject = await Project.findOne({
    PROJECT_id: projectIDFromURL,
  });

  if (!foundProject) {
    return response.status(500).json("No project found.");
  }

  const editedProject = await Project.findOneAndUpdate(
    {
      PROJECT_id: projectIDFromURL,
    },
    {
      PROJECT_title: foundProject.projectTitle,
      PROJECT_description: foundProject.projectDescription,
      PROJECT_id: foundProject.PROJECT_id,
      PROJECT_start: foundProject.projectStart,
      PROJECT_end: foundProject.projectEnd,
      PROJECT_duration: foundProject.projectDuration,
      PROJECT_lastModified: foundProject.PROJECT_lastModified,
      PROJECT_customer: foundProject.projectCustomer,
      PROJECT_ticketNumber: foundProject.projectTicketNumber,
      PROJECT_tasks: [...foundProject.PROJECT_tasks, requestBody],
      PROJECT_owner: foundProject.PROJECT_owner,
    }
  );

  if (!editedProject) {
    response.status(400).json("Could not add new task to project.");
  }

  response.status(200).json(editedProject);
};

const editExistingProject = async (request, response) => {
  try {
    const requestBody = request.body;

    console.log(
      `[PUT] edit existing project with project id:`,
      requestBody.projectTitle
    );

    const editedProject = await Project.findOneAndUpdate(
      { PROJECT_id: requestBody.PROJECT_id },
      {
        PROJECT_title: requestBody.projectTitle,
        PROJECT_description: requestBody.projectDescription,
        PROJECT_id: requestBody.PROJECT_id,
        PROJECT_start: requestBody.projectStart,
        PROJECT_end: requestBody.projectEnd,
        PROJECT_duration: requestBody.PROJECT_duration,
        PROJECT_lastModified: requestBody.PROJECT_lastModified,
        PROJECT_customer: requestBody.projectCustomer,
        PROJECT_ticketNumber: requestBody.projectTicketNumber,
        PROJECT_tasks: requestBody.PROJECT_tasks,
        PROJECT_owner: requestBody.PROJECT_owner,
      },
      { new: true }
    );

    if (!editedProject) {
      return response.status(500).send("Error when updating existing project.");
    }

    response.status(200).json(editedProject);
  } catch (error) {
    response.status(500).json({ message: "an error occured", error });
  }
};

const deleteExistingProject = async (request, response) => {
  const projectIDFromURL = request.query["projectID"];

  console.log("[DELETE] existing project with id:", projectIDFromURL);

  const deletedProject = await Project.deleteOne({
    PROJECT_id: projectIDFromURL,
  });

  if (!deletedProject) {
    return response.status(500).send("Project could not be deleted.");
  }

  const responseDeletedProject = deletedProject;

  responseDeletedProject.PROJECT_title = `[DELETED] ${deletedProject.PROJECT_title}`;

  response.status(200).json(responseDeletedProject);
};

const editTask = async (request, response) => {
  const projectIDFromURL = request.query["projectID"];

  console.log(
    "[PUT] edit task from project id:",
    projectIDFromURL,
    " with task id:",
    request.body.TASK_id
  );

  const foundProject = await Project.findOne({
    PROJECT_id: projectIDFromURL,
  });

  if (!foundProject) {
    return response
      .status(500)
      .json({ message: "No project found for editing task" });
  }

  const tasksWithEditedTasks = foundProject.PROJECT_tasks.filter(
    (task) => task.TASK_id !== request.body.TASK_id
  );

  tasksWithEditedTasks.push(request.body);

  const updatedProject = await Project.findOneAndUpdate(
    {
      PROJECT_id: projectIDFromURL,
    },
    {
      PROJECT_title: foundProject.projectTitle,
      PROJECT_description: foundProject.projectDescription,
      PROJECT_id: foundProject.PROJECT_id,
      PROJECT_start: foundProject.projectStart,
      PROJECT_end: foundProject.projectEnd,
      PROJECT_duration: foundProject.projectDuration,
      PROJECT_lastModified: foundProject.PROJECT_lastModified,
      PROJECT_customer: foundProject.projectCustomer,
      PROJECT_ticketNumber: foundProject.projectTicketNumber,
      PROJECT_owner: foundProject.PROJECT_owner,
      PROJECT_tasks: tasksWithEditedTasks,
    }
  );

  if (!updatedProject) {
    return response
      .status(500)
      .json({ message: "Could not update project task" });
  }

  return response
    .status(200)
    .json({ project: updatedProject, task: request.body });
};

module.exports = {
  getAllProjectWithoutTasks,
  getAllProjects,
  getCurrentProject,
  createNewProject,
  createNewTask,
  editExistingProject,
  editTask,
  deleteExistingProject,
  getCurrentTask,
};
