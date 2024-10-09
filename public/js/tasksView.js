import View from '/js/view.js';

class TaskView extends View {
  _parentEl = document.querySelector('.task--body-header');
  _overlayEl = document.querySelector('.overlay');
  _errMessage;
  _message;

  addHandlerTaskPopupOpen() {
    const overlayElement = this._overlayEl;
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--task-add');
      if (!btn) return;
      overlayElement.classList.remove('hidden');
    });
  }

  addHandlerTaskPopupClose() {
    const overlayElement = this._overlayEl;
    const parentElTask = document.querySelector('.btn--popup-cancel');
    parentElTask.addEventListener('click', function (e) {
      overlayElement.classList.add('hidden');
      console.log('test');
    });
  }

  addHandlerTaskPopupSubmit() {
    const submitBtnEl = document.querySelector('.btn--popup-submit');
    const parentElTask = document.querySelector('.popup--task--title-input');
    submitBtnEl.addEventListener('click', function (e) {
      console.log(parentElTask.value);
      // check input to be less than 50 char AND not empty
      // save input in var & return
      this._data = parentElTask.value;
      return this._data;
    });
  }

  //mtd: save to local
}

export default new TaskView();
