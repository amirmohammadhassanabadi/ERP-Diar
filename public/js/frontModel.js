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

export default { getTasks, giveTasks };
