import view from '/js/views/view.js';

const state = [
  {
    taskId: '4',
    taskTitle: 'task title 4',
    taskStatus: 1,
    referrals: ['SE', 'AB', 'CD'],
    days: 5
  },
  {
    taskId: '1',
    taskTitle: 'task title 1',
    taskStatus: 1,
    referrals: ['SE', 'AB', 'CD'],
    days: 3
  },
  {
    taskId: '2',
    taskTitle: 'task title 2',
    taskStatus: 1,
    referrals: ['SE', 'AB'],
    days: 4
  },
  {
    taskId: '3',
    taskTitle: 'task title 3',
    taskStatus: 0,
    referrals: ['SE'],
    days: 5
  }
];

const user = [
  {
    id: '123456789',
    userName: 'sepehrebrahimi',
    fullName: 'سپهر ابراهیمی',
    tasks: [],
    level: 2,
    department: 'IT'
  },
  {
    id: '1123456789',
    userName: 'amirmohammadhasanabadi',
    fullName: 'امیر محمد حسن آبادی',
    tasks: [],
    level: 2,
    department: 'IT'
  },
  {
    id: '11123456789',
    userName: 'mostafahosseini',
    fullName: 'مصطفی حسینی',
    tasks: [],
    level: 3,
    department: 'IT'
  },
  {
    id: '111123456789',
    userName: 'kasragolirad',
    fullName: 'کسری گلی راد',
    tasks: [],
    level: 2,
    department: 'IT'
  }
];
let taskCounter = 5;
const parentEl = document.querySelector('.container');

const renderContainerTasks = function () {
  // clear container
  view.clear(parentEl);

  // render task container
  view.renderHTML(generateMarkupTasks, parentEl);
};

const renderContainerDashboard = function () {
  // clear container
  view.clear(parentEl);

  // render task container
  view.renderHTML(generateMarkupDashboard, parentEl);

  // initialize dashboard event handlers REMINDER
};

const generateMarkupTasks = function () {
  return `
      <nav class="container__header">
        <span class="c_header-text">وظایف</span>
        <ul class="c_header__nav">
          <li class="nav__item nav__item-active my__tasks">کارهای من</li>
          <li class="nav__item completed__tasks">انجام شده</li>
          <li class="nav__item assigned__tasks ">ارجاع داده شده</li>
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
        <div class="task__container">
        ${generateTaskContainer(0)}
        </div>
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

const handleContainerNav = function (handler) {
  const parentEl = document.querySelector('.c_header__nav');
  parentEl.addEventListener('click', function (e) {
    const navItem = e.target.closest('.nav__item');
    if (!navItem || navItem.classList.contains('nav__item-active')) return;

    // 1. send appropriate task body to handler
    handler(navItem);
  });
};

const navChangeTaskReload = function (status) {
  const taskContainer = parentEl.querySelector('.task__container');

  // clear container body
  view.clear(taskContainer);

  view.renderHTML(generateTaskContainer.bind(null, status), taskContainer);
};

const navChangeAsignedTasks = function () {
  const taskContainer = parentEl.querySelector('.task__container');

  view.clear(taskContainer);

  const tempAssignedToMarkup = () => `
        <div class="container__body">
        <div class="c_body__head" style="font-size: 150%; margin-right: 40%; margin-top: 20%;">
          این بخش در حال توسعه است...
        </div>
  `;
  view.renderHTML(tempAssignedToMarkup, taskContainer);
};

const switchActiveNav = function (navItem) {
  const parentEl = document.querySelector('.c_header__nav');

  // remove current active nav class
  parentEl
    .querySelector('.nav__item-active')
    ?.classList.remove('nav__item-active');

  // add active to target nav item
  navItem.classList.add('nav__item-active');
};

// gets called while no container child on screen BUG
// should handle when it gets called in control so it doesn't get called on init()
const handleTaskAddBtn = function () {
  const overlayEl = document.querySelector('.overlay');
  const parentEl = document.querySelector('.container__body');
  try {
    parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.task__btn-add');
      if (!btn) return;
      overlayEl.classList.remove('hidden');

      // ASYNC => GET USERS REMINDER

      // Add referrals btn event listener
    });
  } catch (err) {
    console.log(err);
  }
};

const handleOverlayLayer = function () {
  const overlayEl = document.querySelector('.overlay');
  overlayEl.addEventListener('click', function (e) {
    const clicked = e.target;
    if (!(clicked === overlayEl)) return;
    overlayEl.classList.add('hidden');
    const popupList = document.querySelector('.popup__overlay');
    console.log(popupList);

    if (popupList && !popupList.classList.contains('hidden'))
      popupList.classList.add('hidden');
  });
};

const handleReferralsBtn = function () {
  const popupContainer = document.querySelector('.popup__container');
  popupContainer.addEventListener('click', function (e) {
    const agentBtn = e.target.closest('.agent-btn');
    if (!agentBtn) return;

    handlePopupUserList();
  });
};

const handlePopupUserList = function () {
  const popupUserList = document.querySelector('.popup__overlay');
  if (!popupUserList?.classList.contains('hidden')) {
    view.clear(popupUserList);
    popupUserList.classList.add('hidden');
  } else {
    const markupGen = () => `
    <div class="popup">
    <ul class="user__list">
    ${user.map(generateUsersListMarkup).join('')}
    </ul>
    </div>
    `;

    view.clear(popupUserList);
    popupUserList.classList.remove('hidden');

    // LOAD SPINNER ON DIV

    view.renderHTML(markupGen, popupUserList);

    handleSelectedReferral();
  }
};

const generateUsersListMarkup = function (user) {
  return `
    <li>
      <div class="user__name" data-user-id="${user.id}"> ${user.fullName} </div>
      <div class="initial"> ${user.fullName
        .split(' ')
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join(' ')} </div>
    </li>
  `;
};

const handleSelectedReferral = function () {
  const userList = document.querySelector('.user__list');
  const agentBtn = document.querySelector('.agent-btn');
  const userDisplay = document.querySelector('.user__display');

  userList.addEventListener('click', function (e) {
    const userEl = e.target.closest('li');
    if (!userEl) return;
    const userId = userEl.firstElementChild.dataset.userId;

    // close users list
    handlePopupUserList();

    // render user to referral div

    // 1. add hidden to referral btn
    agentBtn.classList.toggle('hidden');

    view.renderHTML(generateUserReferralMarkup.bind(null, userId), userDisplay);

    // 2. add ev listener for close btn

    // 3. add hidden to referral btn
    userList.classList.toggle('hidden');

    // 4. add border to user display
    userDisplay.classList.add('user__border');
  });
};

const handleUserCloseBtn = function () {
  const userDisplay = document.querySelector('.user__display');
  const closeBtn = document.querySelector('.user__close__btn');
};

const generateUserReferralMarkup = function (id) {
  const targetUsr = user.find(usr => usr.id === id);
  return `
   <div class="user__name" data-user-id="${targetUsr.id}"> ${
    targetUsr.fullName
  } </div>
   <div class="initial"> ${targetUsr.fullName
     .split(' ')
     .slice(0, 2)
     .map(word => word[0].toUpperCase())
     .join(' ')} </div>
  `;
};

const handleCheckbox = function (handler) {
  const parentEl = document.querySelector('.task__container');
  parentEl.addEventListener('click', function (e) {
    const checkbox = e.target.closest('.checkbox');
    if (!checkbox) return;

    const targetTaskId = e.target.closest('.task').dataset.taskId;
    handler(targetTaskId);

    // console.log('target task id: ', targetTaskId);

    // const targetTask = state.find(tsk => tsk.taskId === targetTaskId);

    // targetTask.taskStatus
    //   ? (targetTask.taskStatus = 0)
    //   : (targetTask.taskStatus = 1);

    // console.log(targetTask.taskStatus);

    // view.clear(parentEl);
    // view.renderHTML(
    //   generateTaskContainer.bind(null, targetTask.taskStatus ? 0 : 1),
    //   parentEl
    // );

    // const taskIndex = state.ongoing.reduce((acc, task, i) => {
    //   return task.taskId === checkboxId ? i : acc;
    // }, -1);

    // state.completed.push(state.ongoing[taskIndex]);
    // state.ongoing.splice(taskIndex, 1);

    // re-render task list
    // const containerBodyEl = document.querySelector('.container__body');
    // containerBodyEl.innerHTML = '';
    // view.renderHTML(generateMarkupCompletedTasks, containerBodyEl);
    // persistTasks();
    // handleCheckbox();
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
      return;
    }

    // default day is set to 1
    let daysInput = Number(timeInputEl.value) ? Number(timeInputEl.value) : 1;
    // store in state
    state.ongoing.push({
      taskId: taskCounter,
      taskTitle: inputEl.value,
      referrals: ['SE'],
      days: daysInput
    });
    taskCounter++;

    // close popup
    overlayEl.classList.remove('hidden');

    // show success message

    // re-render tasks list
    const taskContainerEl = document.querySelector('.task__container');
    taskContainerEl.innerHTML = '';
    view.renderHTML(generateTaskContainer, taskContainerEl);
    inputEl.value = '';
    timeInputEl.value = '';
    persistTasks();
    overlayEl.classList.add('hidden');
  });
};

const generateTaskContainer = function (status) {
  return `
            <span class="hint-text">وظایف امروز (${state.reduce((acc, task) => {
              if (task.taskStatus === status) acc++;
              return acc;
            }, 0)} مورد)</span>
          <ul class="task__list">
          ${state.map(generateSingleTask.bind(null, status)).join('')}
          </ul>

  `;
};

const generateSingleTask = function (status, task) {
  let i = 0;
  let markup;

  if (task.taskStatus === status) {
    markup = `
    <li class="task" data-task-id="${task.taskId}">
    <div class="task__right">
      <input class="checkbox" type="checkbox" ${
        status ? 'checked' : ''
      } data-id=${task.taskId} />
      <span class="task-text">${task.taskTitle}</span>
    </div>
    <div class="task__left">
      <div class="assignedto">
        ${task.referrals
          .map(person => {
            i++;

            return `<div class="initial ${
              i == 1 ? '' : `initial-${i}`
            }">${person}</div>`;
          })
          .join('')}
      </div>
      <span class="deadline">${task.days} روز مانده</span>
    </div>
  </li>
`;
  }

  i = 0;
  return markup;
};

export default {
  state,
  renderContainerDashboard,
  handleTaskAddBtn,
  handlePopupClose,
  handlePopupSubmit,
  handleContainerNav,
  navChangeTaskReload,
  navChangeAsignedTasks,
  switchActiveNav,
  handleCheckbox,
  renderContainerTasks,
  handleOverlayLayer,
  handleReferralsBtn
};
