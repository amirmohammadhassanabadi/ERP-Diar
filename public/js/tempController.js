import tasksView from '/js/tasksView.js';

// const controlAddNewTask = function () {
// };

const init = function () {
  // should be applied when user clicks on Tasks tab in menu
  tasksView.addHandlerTaskPopupOpen();
  tasksView.addHandlerTaskPopupClose();
  tasksView.addHandlerTaskPopupSubmit();
};

init();
