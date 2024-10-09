import View from '/js/view.js';

class TaskView extends View {
  _parentEl = document.querySelector('.task--body-header');
  _errMessage;
  _message;

  addHandlerTaskPopupOpen() {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--task-add');
      if (!btn) return;
      const overlayEl = document.querySelector('.overlay');
      overlayEl.classList.remove('hidden');
      console.log(overlayEl);
    });
  }

  //   addHandlerTaskPopupClose() {
  //     const parentElTmp = document.querySelector('.');
  //     this._parentEl.addEventListener('click');
  //   }
}

export default new TaskView();
