import { getAPI, postAPI, deleteAPI } from '/js/API/fetch.js';
import { getUserInfo } from '/js/data/user.data.js';

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

const toggleTaskState = async (taskStatus, taskId) => {

  const response = await postAPI('/tasks/changestatus', {
    taskId: taskId,
    taskStatus: taskStatus
  });

  if (response.statusCode !== 200) {
    console.error(response.statusCode);
    return false;
  }
  return true;
};

const temp = async taskId => {
  // find index for the task obj that matches task ID
  const targetTask = findTaskStat(taskId);

  if (targetTask) {
    const response = await postAPI('/tasks/changestatus', {
      taskId: taskId,
      taskStatus: targetTask.status
    });

    if (response.statusCode != 200) {
      console.error(response.statusCode);
      return;
    }

    targetTask.status
      ? (targetTask.status = false)
      : (targetTask.status = true);
  }
  console.log(taskData);
};

const addNewTask = async function (payload) {
  const postTask = await postAPI('/tasks/addtasks', payload);
  if (postTask.statusCode !== 200) {
    console.error(postTask.statusCode);
    return 0;
    // throw new Error('could not post task (' + postTask.statusCode + ')');
  }
  // console.log('post: ');
  // console.log(postTask);

  postTask.data.status = false;
  const temp = await getUserInfo();
  postTask.data.creator = temp.id;
  postTask.data.agents = [await getUserInfo()];
  // console.log(postTask.data.creator);

  if (taskData) {
    taskData.push(postTask.data);
    console.log(taskData);
    // await getTasks();
    // console.log(taskData);
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
