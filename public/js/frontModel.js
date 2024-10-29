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

const addNewTask = async function (payload) {
  const postTask = await postAPI('/tasks/addtasks', payload);
  if (postTask.statusCode !== 200) {
    console.error(postTask.statusCode);
    return 0;
    // throw new Error('could not post task (' + postTask.statusCode + ')');
  }
  if (taskData) {
    taskData.push(payload);
    console.log(taskData);
  } else {
    console.log('no task data');
    return 0;
  }
};

export default {
  getTasks,
  giveTasks,
  toggleTaskState,
  findTaskStat,
  addNewTask
};
