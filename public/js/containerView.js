import View from '/js/view.js';

// container event handlers

const handleTaskAddBtn = function () {
  const overlayEl = document.querySelector('.overlay');
  const parentEl = document.querySelector('.container__body');

  parentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.task__btn-add');
    if (!btn) return;
    console.log('add btn pressed');
    overlayEl.classList.remove('hidden');
  });
};

// popup event handlers
// close and submit share parentEl => one ev listener for each REFACTOR

const handlePopupClose = function () {
  const overlayEl = document.querySelector('.overlay');
  const parentEl = document.querySelector('.popup__downside');

  parentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.cancel__btn');
    if (!btn) return;
    console.log('cancel btn pressed');
    overlayEl.classList.add('hidden');
  });
};

const handlePopupSubmit = function () {
  const btnParentEl = document.querySelector('.popup__downside');
  const inputEl = document.querySelector('.title-input');

  btnParentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.submit__btn');
    if (!btn) return;
    console.log(inputEl.value);
  });
};

export default { handleTaskAddBtn, handlePopupClose, handlePopupSubmit };

// class TaskView extends View {
//   _overlayEl = document.querySelector('.overlay');
//   _errMessage;
//   _message;

// addHandlerTaskPopupOpen() {
//   const overlayElement = this._overlayEl;
//   const parentEl = document.querySelector('.c_body__head');
//   parentEl.addEventListener('click', function (e) {
//     const btn = e.target.closest('.task__btn-add');
//     if (!btn) return;
//     overlayElement.classList.remove('hidden');
//   });
// }

// addHandlerTaskPopupClose() {
//   const overlayElement = this._overlayEl;
//   const parentElTask = document.querySelector('.cancel__btn');
//   parentElTask.addEventListener('click', function (e) {
//     overlayElement.classList.add('hidden');
//     console.log('test');
//   });
// }

// addHandlerTaskPopupSubmit() {
//   const submitBtnEl = document.querySelector('.submit__btn');
//   const parentElTask = document.querySelector('.title-input');
//   submitBtnEl.addEventListener('click', function (e) {
//     console.log(parentElTask.value);
//     // check input to be less than 50 char AND not empty
//     // save input in var & return
//     this._data = parentElTask.value;
//     return this._data;
//   });
// }

//mtd: save to local
// }
// export default new TaskView();
