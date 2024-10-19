import containerView from '/js/containerView.js';
import navView from '/js/navView.js';
import menuView from '/js/menuView.js';
import * as model from '/js/tempModel.js';

// const controlAddNewTask = function () {
// };

const controlTaskContainer = function () {};

const controlMenuBtn = function () {
  // to collapse and expand menu
  menuView.collapseMenu();
};

const init = function () {
  navView.handleMenuBtn(controlMenuBtn);
  containerView.handleMenuChange();
  containerView.localStorageInit();
  containerView.handleTaskAddBtn();
  containerView.handlePopupClose();
  containerView.handlePopupSubmit();
  containerView.handleContainerNav();
};

init();
