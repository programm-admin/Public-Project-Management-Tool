import { Project } from '../interfaces/Project';

export const DEFAULT_PROJECT: Project = {
  PROJECT_title: '',
  PROJECT_description: '',
  PROJECT_id: '',
  PROJECT_start: new Date(),
  PROJECT_end: new Date(),
  PROJECT_duration: 1,
  PROJECT_lastModified: new Date(),
  PROJECT_customer: '',
  PROJECT_ticketNumber: '',
  PROJECT_tasks: [
    {
      TASK_title: '',
      TASK_description: '',
      TASK_id: '',
      TASK_start: new Date(),
      TASK_end: new Date(),
      TASK_duration: 0,
      TASK_lastModified: new Date(),
      TASK_Members: [],
      TASK_ticketNumber: '',
    },
  ],
  PROJECT_owner: '',
};
