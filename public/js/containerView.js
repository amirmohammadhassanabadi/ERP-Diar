import view from '/js/view.js';

const state = {
  completed: [],
  ongoing: [
    {
      taskId: 1,
      taskTitle: 'تیتر تسک',
      assignedTo: ['SE', 'AB', 'CD'],
      days: 3
    },
    { taskId: 2, taskTitle: 'تیتر تسک', assignedTo: ['SE', 'AB'], days: 4 },
    { taskId: 3, taskTitle: 'تیتر تسک', assignedTo: ['SE'], days: 5 }
  ]
};
let taskCounter = 4;

// menu event handler

const handleMenuChange = function () {
  const parentEl = document.querySelector('.menu');
  parentEl.addEventListener('click', function (e) {
    const menu = e.target.closest('.menu__item');
    if (!menu || menu.classList.contains('menu-active')) return;

    // 1. empty container
    const containerEl = document.querySelector('.container');
    containerEl.innerHTML = '';

    // 2. take away active class
    parentEl.querySelector('.menu-active')?.classList.remove('menu-active');
    console.log(parentEl);

    // 3. generate menu markup
    if (menu.classList.contains('menu__tasks')) {
      console.log('going to tasks');
      view.renderHTML(generateMarkupTasks, containerEl);
      handleTaskAddBtn();
    } else if (menu.classList.contains('menu__dashboard')) {
      console.log('going to dashboard');
      view.renderHTML(generateMarkupDashboard, containerEl);
      // initialize dashboard event handlers
    }

    // 4. add active class to selected menu
    menu.classList.add('menu-active');
  });
};

const generateMarkupTasks = function () {
  return `
        <nav class="container__header">
        <span class="c_header-text">وظایف</span>
        <ul class="c_header__nav">
          <li class="nav__item nav__item-active">کارهای من</li>
          <li class="nav__item">انجام شده</li>
          <li class="nav__item">تقویم</li>
        </ul>
      </nav>
      <div class="container__body">
        <div class="c_body__head">
          <button class="task__btn-add task__btn">
            <i class="fa-solid fa-plus fa-2xs" style="color: #ffffff"></i>
            ایجاد وظیفه
          </button>
          <button class="task__btn task__btn-filter">
            <img src="/img/icons/sort-icon.png" alt="sort-icon" />
            فیلتر نمایش وظایف
          </button>
          <!-- <button class="task__btn task__btn-sort">
              <i
                class="fa-regular fa-bars-sort fa-flip-horizontal"
                style="color: #979797"
              ></i>
              مرتب سازی: پیش فرض
            </button> -->
        </div>
        <span class="hint-text">وظایف امروز (${state.ongoing.length} مورد)</span>
        <ul class="task__list">
          <li class="task">
            <div class="task__right">
              <input class="checkbox" type="checkbox" />
              <span class="task-text">تیتر تسک</span>
            </div>
            <div class="task__left">
              <div class="assignedto">
                <div class="initial initial-2">CD</div>
                <div class="initial">AB</div>
                <div class="initial initial-3">SE</div>
              </div>
              <span class="deadline">3 روز مانده</span>
            </div>
          </li>
          <li class="task">
            <div class="task__right">
              <input class="checkbox" type="checkbox" />
              <span class="task-text">تیتر تسک</span>
            </div>
            <div class="task__left">
              <div class="assignedto">
                <div class="initial">AB</div>
                <div class="initial initial-3">SE</div>
              </div>
              <span class="deadline">4 روز مانده</span>
            </div>
          </li>
          <li class="task">
            <div class="task__right">
              <input class="checkbox" type="checkbox" />
              <span class="task-text">تیتر تسک</span>
            </div>
            <div class="task__left">
              <div class="assignedto">
                <div class="initial initial-3">SE</div>
              </div>
              <span class="deadline">5 روز مانده</span>
            </div>
          </li>
        </ul>
      </div>
  `;
};

const generateMarkupDashboard = function () {
  return `
      <nav class="container__header">
        <p class="c_header-text" style="margin-bottom: 4rem;">داشبورد</p>
      </nav>
      <div class="container__body">
        <div class="c_body__head" style="font-size: 150%; margin-right: 40%; margin-top: 20%;">
          این بخش در حال توسعه است...
        </div>
      </div>
  `;
};

// container event handlers

// gets called while no container child on screen BUG
// should handle when it gets called in control so it doesn't get called on init()
const handleTaskAddBtn = async function () {
  const overlayEl = document.querySelector('.overlay');
  const parentEl = document.querySelector('.container__body');
  try {
    parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.task__btn-add');
      if (!btn) return;
      console.log('add btn pressed');
      overlayEl.classList.remove('hidden');
    });
  } catch (err) {
    console.log(err);
  }
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
  const overlayEl = document.querySelector('.overlay');
  // temporary day input
  const timeInputEl = document.querySelector('.description__item');

  btnParentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.submit__btn');
    if (!btn) return;
    // func to check conditions
    if (!inputEl.value) {
      console.log('no input');
      return;
    }
    console.log(inputEl.value);

    // default day is set to 1
    let daysInput = Number(timeInputEl.value) ? Number(timeInputEl.value) : 1;
    // store in state
    state.ongoing.push({
      taskId: taskCounter,
      taskTitle: inputEl.value,
      assignedTo: ['SE'],
      days: daysInput
    });
    taskCounter++;

    // close popup
    overlayEl.classList.remove('hidden');

    // show success message
    console.log(
      `successfully added task with title "${
        state.ongoing[state.ongoing.length - 1].taskTitle
      }" .`
    );
    console.log(state);
    // re-render tasks list
  });
};

// header event handlers

const handleMenuBtn = function () {
  const parentEl = document.querySelector('header');
  const menuEl = document.querySelector('.menu');
  const containerEl = document.querySelector('.container');

  parentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.menu__btn');
    if (!btn) return;
    menuEl.classList.toggle('collapse');
    containerEl.classList.toggle('fullscreen');
  });
};

export default {
  handleMenuBtn,
  handleMenuChange,
  handleTaskAddBtn,
  handlePopupClose,
  handlePopupSubmit
};

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
