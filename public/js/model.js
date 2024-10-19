export let state = {
  completed: [
    {
      taskId: 4,
      taskTitle: 'task title 4',
      assignedTo: ['SE', 'AB', 'CD'],
      days: 5
    }
  ],
  ongoing: [
    {
      taskId: 1,
      taskTitle: 'task title 1',
      assignedTo: ['SE', 'AB', 'CD'],
      days: 3
    },
    { taskId: 2, taskTitle: 'task title 2', assignedTo: ['SE', 'AB'], days: 4 },
    { taskId: 3, taskTitle: 'task title 3', assignedTo: ['SE'], days: 5 }
  ]
};
export let taskCounter = 5;
