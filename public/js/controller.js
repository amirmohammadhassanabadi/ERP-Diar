import containerView from '/js/views/containerView.js';
import navView from '/js/views/navView.js';
import menuView from '/js/views/menuView.js';
import model from '/js/frontModel.js';
// const controlAddNewTask = function () {
// };

const controlMenuChange = async function (menu) {
  // 1. switch active class
  menuView.switchActiveEl(menu);

  // 2. (ASYNC) render placeholder data (or spinner) REMINDER

  // 3. load menu according to function input
  if (menu.classList.contains('menu__dashboard'))
    await containerView.renderContainerDashboard();
  else if (menu.classList.contains('menu__tasks')) {
    await model.getTasks();
    await containerView.renderContainerTasks();
    containerView.handleTaskAddBtn();
    containerView.handleCheckbox(controlCheckbox);
    containerView.handleContainerNav(controlContainerNav);
  } else console.error('cannot find menu');
};

const controlCheckbox = async function (taskEl) {
  containerView.renderConfirmPopup(1);

  // ev listener for overlay, submit, and cancel button
  const isConfirmed = await containerView.handleConfirmPopup();
  controlConfirmPopup(taskEl, isConfirmed);

  // if (!isConfirmed) return;

  // model.toggleTaskState(taskId);

  // const taskStat = model.findTaskStat(taskId).status;
  // await containerView.navChangeTaskReload(taskStat ? false : true);
};

const controlConfirmPopup = async function (taskEl, confirm) {
  if (!confirm) {
    const checkbox = taskEl.querySelector('.checkbox');
    containerView.renderConfirmPopup(0);
    checkbox.checked = !checkbox.checked;
    return;
  }

  containerView.renderConfirmPopup(0);

  // 1. post to DB
  const response = await model.toggleTaskState(
    taskEl.dataset.taskStatus,
    taskEl.dataset.taskId
  );

  if (!response) {
    checkbox.checked = !checkbox.checked;
    // show error message REMINDER
    return;
  }
  containerView.incrementTaskNum(-1);
  // 2. remove task el
  containerView.removeTaskEl(taskEl);
  // view.removeHTML(taskEl);

  // const taskStat = model.findTaskStat(taskId).status;
  // await containerView.navChangeTaskReload(taskStat ? false : true);
};

const controlContainerNav = function (navItem) {
  // 1. switch active nav item
  containerView.switchActiveNav(navItem);

  // 2. (ASYNC) render placeholder data REMINDER

  // 3. load task body according to function input
  if (navItem.classList.contains('my__tasks')) {
    // TEMP remove add task btn
    document.querySelector('.task__btn-add').classList.remove('hidden');
    containerView.navChangeTaskReload(false);
  } else if (navItem.classList.contains('completed__tasks')) {
    // TEMP remove add task btn
    document.querySelector('.task__btn-add').classList.add('hidden');
    containerView.navChangeTaskReload(true);
  } else if (navItem.classList.contains('assigned__tasks')) {
    // TEMP remove add task btn
    document.querySelector('.task__btn-add').classList.add('hidden');
    containerView.navChangeAsignedTasks();
  } else console.error('cannot find nav item');
};

const controlMenuBtn = function () {
  // to collapse and expand menu
  menuView.collapseMenu();
};

const init = function () {
  navView.handleMenuBtn(controlMenuBtn);
  menuView.handleMenuChange(controlMenuChange);
  // containerView.localStorageInit();
  // containerView.handleTaskAddBtn();
  containerView.handlePopupClose();
  containerView.handlePopupSubmit();
  containerView.handleReferralsBtn();
  containerView.handleOverlayLayer();
  // containerView.handleContainerNav();
};

init();
