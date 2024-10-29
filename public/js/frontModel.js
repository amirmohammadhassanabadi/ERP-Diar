import { getAPI, postAPI, deleteAPI } from '/js/API/fetch.js';

let taskData;

async function getTasks() {
  const taskRes = await getAPI('/tasks/gettasks');
  if (taskRes.statusCode !== 200 || !taskRes) {
    console.error(taskRes.statusCode);
    return;
  }

  taskData = taskRes.data;
  return taskRes.data;
}

const giveTasks = () => taskData;

const findTaskStat = taskId => taskData.find(tsk => tsk.id === taskId);

const toggleTaskState = taskId => {
  // find index for the task obj that matches task ID
  const targetTask = findTaskStat(taskId);

  if (targetTask)
    targetTask.status
      ? (targetTask.status = false)
      : (targetTask.status = true);
};

export default { getTasks, giveTasks, toggleTaskState, findTaskStat };
