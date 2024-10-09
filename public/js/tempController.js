import tasksView from '/js/tasksView.js';

const init = function () {
  // should be applied when user clicks on Tasks tab in menu
  tasksView.addHandlerTaskPopupOpen();
  tasksView.addHandlerTaskPopupClose();
};

init();
