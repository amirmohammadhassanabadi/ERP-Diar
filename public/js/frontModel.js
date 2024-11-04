import { getAPI, postAPI, deleteAPI } from '/js/API/fetch.js';
import { getUserInfo } from '/js/data/user.data.js';
import { popupHandler } from "/js/includes/popup.js";

let taskData;

async function getTasks() {
  const taskRes = await getAPI('/tasks/gettasks');
  if (taskRes.statusCode !== 200 || !taskRes) {
    if (taskRes.statusCode == 401) {
      location.href = "/auth/login";
    }else if(taskRes.statusCode == 500){
      popupHandler(taskRes.statusCode, "مشکلی پیش آمده لطفا دوباره تلاش کنید")
    }
    return false;
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
    if (response.statusCode == 404 || response.statusCode == 500) {
      popupHandler(response.statusCode, "مشکلی پیش اومده لطفا دوباره تلاش کنید");
    }else if(response.statusCode ==403){
      location.href = "/auth/login";
    }
    return false;
  }
  return true;
};

// const temp = async taskId => {
//   // find index for the task obj that matches task ID
//   const targetTask = findTaskStat(taskId);

//   if (targetTask) {
//     const response = await postAPI('/tasks/changestatus', {
//       taskId: taskId,
//       taskStatus: targetTask.status
//     });

//     if (response.statusCode != 200) {
//       console.error(response.statusCode);
//       return;
//     }

//     targetTask.status
//       ? (targetTask.status = false)
//       : (targetTask.status = true);
//   }
//   console.log(taskData);
// };

const addNewTask = async function (payload) {
  const postTask = await postAPI('/tasks/addtasks', payload);
  if (postTask.statusCode !== 200) {
    if (postTask.statusCode == 408) {
      popupHandler(postTask.statusCode, "فیلد عنوان تسک اجباری می باشد")
    }
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
    return postTask.data;
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
