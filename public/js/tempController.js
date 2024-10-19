import containerView from '/js/containerView.js';
import navView from '/js/navView.js';
import menuView from '/js/menuView.js';
import * as model from '/js/tempModel.js';

// const controlAddNewTask = function () {
// };

const controlMenuChange = function (menu) {
  switch (menu) {
    // dashboard
    case 1:
      containerView.loadContainerDashboard();

      break;

    // tasks
    case 2:
      containerView.loadContainerTasks();
      containerView.handleTaskAddBtn();
      containerView.handleContainerNav();
      containerView.handleTaskCompletion();

      break;

    default:
      break;
  }
};

const controlMenuBtn = function () {
  // to collapse and expand menu
  menuView.collapseMenu();
};

const init = function () {
  navView.handleMenuBtn(controlMenuBtn);
  menuView.handleMenuChange(controlMenuChange);
  containerView.localStorageInit();
  // containerView.handleTaskAddBtn();
  containerView.handlePopupClose();
  containerView.handlePopupSubmit();
  // containerView.handleContainerNav();
};

init();
