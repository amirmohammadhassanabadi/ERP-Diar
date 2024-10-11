import containerView from '/js/containerView.js';
// const controlAddNewTask = function () {
// };

const init = function () {
  // should be applied when user clicks on Tasks tab in menu
  containerView.handleTaskAddBtn();
  containerView.handlePopupClose();
  containerView.handlePopupSubmit();
};

init();
