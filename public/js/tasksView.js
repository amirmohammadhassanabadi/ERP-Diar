import View from '/js/view.js';

class TaskView extends View {
  _parentEl = document.querySelector('.c_body__head');
  _overlayEl = document.querySelector('.overlay');
  _errMessage;
  _message;

  addHandlerTaskPopupOpen() {
    const overlayElement = this._overlayEl;
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.task__btn-add');
      if (!btn) return;
      overlayElement.classList.remove('hidden');
    });
  }

  addHandlerTaskPopupClose() {
    const overlayElement = this._overlayEl;
    const parentElTask = document.querySelector('.cancel__btn');
    parentElTask.addEventListener('click', function (e) {
      overlayElement.classList.add('hidden');
      console.log('test');
    });
  }

  addHandlerTaskPopupSubmit() {
    const submitBtnEl = document.querySelector('.submit__btn');
    const parentElTask = document.querySelector('.title-input');
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
