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
    containerView.renderContainerDashboard();
  else if (menu.classList.contains('menu__tasks')) {
    await model.getTasks();
    await containerView.renderContainerTasks();
    containerView.handleTaskAddBtn();
    containerView.handleCheckbox(controlCheckbox);
    containerView.handleContainerNav(controlContainerNav);
  } else console.error('cannot find menu');
};

const controlCheckbox = async function (taskId) {
  containerView.addConfirmPopup();

  // ev listener for overlay, submit, and cancel button
  containerView.handleConfirmPopup(controlConfirmPopup);

  model.toggleTaskState(taskId);

  const taskStat = model.findTaskStat(taskId).status;
  await containerView.navChangeTaskReload(taskStat ? false : true);
};

const controlConfirmPopup = function () {
  //
};

const controlContainerNav = function (navItem) {
  // 1. switch active nav item
  containerView.switchActiveNav(navItem);

  // 2. (ASYNC) render placeholder data REMINDER

  // 3. load task body according to function input
  if (navItem.classList.contains('my__tasks'))
    containerView.navChangeTaskReload(false);
  else if (navItem.classList.contains('completed__tasks'))
    containerView.navChangeTaskReload(true);
  else if (navItem.classList.contains('assigned__tasks'))
    containerView.navChangeAsignedTasks();
  else console.error('cannot find nav item');
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
