import view from '/js/views/view.js';
import { getAPI, postAPI, deleteAPI } from '/js/API/fetch.js';
import { getUserInfo } from '/js/data/user.data.js';
import model from '/js/frontModel.js';
import { popupHandler } from '/js/includes/popup.js';

// get user information
document.addEventListener('DOMContentLoaded', async () => {
  const userInfo = await getUserInfo();
  let fullName = '';
  if (userInfo.fullName.split(' ').length > 1) {
    fullName =
      userInfo.fullName.split(' ')[0][0] + userInfo.fullName.split(' ')[1][0];
  } else {
    fullName =
      userInfo.fullName.split(' ')[0][0] + userInfo.fullName.split(' ')[0][1];
  }
  document.getElementById('profile_img').innerText = fullName;
  document.getElementById('profile_name').innerText = userInfo.username;
});

const referPopupWrapper = document.querySelector('.referPopupWrapper');
document.querySelector('.container').addEventListener('click', async e => {
  if (e.target.classList.contains('deleteTaskBtn')) {
    const response = await deleteAPI(
      `/tasks/deletetask/${e.target.parentElement.parentElement.dataset.taskId}`
    );
    if (response.statusCode == 200) {
      e.target.parentElement.parentElement.remove();
    }
  } else if (e.target.classList.contains('referBtn')) {
    referPopupWrapper.children[0].value =
      e.target.parentElement.parentElement.dataset.taskId;
    referPopupWrapper.classList.toggle('dis-none');
    referPopupWrapper.classList.toggle('dis-flex');

    // const response = await getAPI("/tasks/referenceableusers");
    // console.log(response);
  }
});

function renderReffrencableUsers(users) {
  return users.map(user => {
    return `
    <div>
    <input type="hidden" value="${user.id}" />
      <div class="nameInput">
        ${user.username}
      </div>
        <span id="profile_img">
          ${user.username[0]}${user.username[1]}
        </span>
    </div>
`;
  });
}

referPopupWrapper.addEventListener('click', async e => {
  if (e.target.classList.contains('referPopupWrapper')) {
    e.target.children[1].children[2].value = '';
    referPopupWrapper.classList.toggle('dis-none');
    referPopupWrapper.classList.toggle('dis-flex');
  } else if (e.target.classList.contains('agentBtn')) {
    const data = await getAPI('/tasks/referenceableusers');
    if (data.statusCode == 200) {
      document.getElementById('referUserPoppup').innerHTML =
        renderReffrencableUsers(data.data).join('');
      document.getElementById('referUserPoppup').classList.toggle('dis-none');
      document.getElementById('referUserPoppup').classList.toggle('dis-block');
    } else if (data.statusCode == 403) {
      console.log('ok');
      popupHandler(
        403,
        document.querySelector('.alert-wrapper'),
        document.querySelector('.main-alert'),
        document.querySelector('.main-alert > h3'),
        'کاربر دسترسی ارجاع تسک را ندارد'
      );
    } else if (data.statusCode == 500) {
      popupHandler(
        403,

        document.querySelector('.alert-wrapper'),
        document.querySelector('.main-alert'),
        document.querySelector('.main-alert > h3'),
        'مشکلی پیش آمده لطفا دوباره تلاش کنید'
      );
    }
  } else if (e.target.classList.contains('cancelBtn')) {
    referPopupWrapper.classList.toggle('dis-none');
    referPopupWrapper.classList.toggle('dis-flex');
    e.target.parentElement.previousElementSibling.value = '';
  } else if (e.target.classList.contains('submitBtn')) {
    const payload = {
      taskId: referPopupWrapper.children[0].value,
      newAgent: ''
    };
    const response = await postAPI('/tasks//changetaskagent', payload);
  }
});

document.querySelector('.logout__btn').addEventListener('click', async () => {
  await getAPI('/auth/logout');
});

const parentEl = document.querySelector('.container');

const renderContainerTasks = async function () {
  // clear container
  view.clear(parentEl);

  // render task container
  await view.renderHTML(generateMarkupTasks, parentEl);
};

const renderContainerDashboard = async function () {
  // clear container
  view.clear(parentEl);

  // render task container
  await view.renderHTML(generateMarkupDashboard, parentEl);

  // initialize dashboard event handlers REMINDER
};

const generateMarkupTasks = async function (status = false) {
  const taskContainerMarkup = await generateTaskContainer(status);
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
        ${taskContainerMarkup}
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

const navChangeTaskReload = async function (status) {
  const taskContainer = parentEl.querySelector('.task__container');

  // clear container body
  view.clear(taskContainer);

  await view.renderHTML(
    generateTaskContainer.bind(null, status),
    taskContainer
  );
};

const navChangeAsignedTasks = async function () {
  const data = await getAPI('/tasks/getrefferedtasks');
  console.log(data);

  const taskContainer = parentEl.querySelector('.task__container');

  view.clear(taskContainer);

  const tempAssignedToMarkup = () => `
        <div>
          <div class="c_body__head" style="font-size: 150%; margin-right: 40%; margin-top: 20%;">
            این بخش در حال توسعه است...
          </div>
          <div>
            test
          </div>
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
      closeUserListOnClick();

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
  const popupContainer = document.querySelector('.options__list');
  popupContainer.addEventListener('click', function (e) {
    const agentBtn = e.target.closest('.agent-btn');

    if (!agentBtn) return;

    // Fetch Agents Data

    handlePopupUserList();
  });
};

const handlePopupUserList = async function () {
  const response = await getAPI('/tasks/agent');
  if (response.statusCode !== 200 || response.data.length === 0) {
    console.log(response);

    console.error('err code:', response.statusCode, 'OR empty data');
    return;
  }
  console.log(response.data);
  const users = await response.data;

  const popupUserList = document.querySelector('.popup__overlay');
  if (!popupUserList?.classList.contains('hidden')) {
    view.clear(popupUserList);
    popupUserList.classList.add('hidden');
  } else {
    const markupGen = () => `
    <div class="popup">
    <ul class="user__list">
    ${users.map(generateUsersListMarkup).join('')}
    </ul>
    </div>
    `;

    view.clear(popupUserList);
    popupUserList.classList.remove('hidden');

    // LOAD SPINNER ON DIV

    await view.renderHTML(markupGen, popupUserList);

    handleSelectedReferral(response.data);
  }
};

const closeUserListOnClick = function () {
  const parentEl = document.querySelector('.popup__container');
  parentEl.addEventListener('click', function (e) {
    const userListEl = document.querySelector('.popup__overlay');
    // if e target closest popup__overlay return

    if (e.target.closest('.popup__overlay')) {
      return;
    }

    userListEl.classList.add('hidden');
  });
};

const generateUsersListMarkup = function (user) {
  console.log(user.fullName);

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

const handleSelectedReferral = function (users) {
  const userList = document.querySelector('.user__list');
  const agentBtn = document.querySelector('.agent-btn');
  const userDisplay = document.querySelector('.user__display');

  userList.addEventListener('click', async function (e) {
    const userEl = e.target.closest('li');
    if (!userEl) return;
    const userId = userEl.firstElementChild.dataset.userId;

    // close users list
    handlePopupUserList();

    // render user to referral div

    // 1. add hidden to referral btn
    agentBtn.classList.toggle('hidden');

    await view.renderHTML(
      generateUserReferralMarkup.bind(null, userId, users),
      userDisplay
    );

    // 2. add ev listener for close btn

    // 3. add hidden to referral btn
    userList.classList.toggle('hidden');

    // 4. add border to user display
    userDisplay.classList.add('user__border');

    // 5. add close btn event listener

    // KEEPS CREATING EV LISTENERS BUG
    handleUserCloseBtn();
  });
};

const generateUserReferralMarkup = function (id, users) {
  const targetUsr = users.find(usr => usr.id === id);
  console.log(targetUsr);

  return `
   <div class="user__name" data-user-id="${targetUsr.id}"> ${
    targetUsr.fullName
  } </div>
   <div class="initial"> ${targetUsr.fullName
     .split(' ')
     .slice(0, 2)
     .map(word => word[0].toUpperCase())
     .join(' ')} </div>
    <i class="user__close__btn hidden fa-duotone fa-solid fa-xmark fa-s"></i>

  `;
};

const handleUserCloseBtn = function () {
  const userDisplay = document.querySelector('.user__display');
  const closeBtn = document.querySelector('.user__close__btn');

  userDisplay.addEventListener('mouseenter', function () {
    closeBtn.classList.remove('hidden');
  });

  userDisplay.addEventListener('mouseleave', function () {
    closeBtn.classList.add('hidden');
  });

  closeBtn.addEventListener('click', removePopupUsers);
};

const removePopupUsers = function () {
  const userDisplay = document.querySelector('.user__display');
  const agentBtn = document.querySelector('.agent-btn');

  userDisplay.classList.remove('user__border');
  view.clear(userDisplay);
  agentBtn.classList.remove('hidden');
};

const handleCheckbox = function (handler) {
  const parentEl = document.querySelector('.task__container');
  parentEl.addEventListener('click', async function (e) {
    const checkbox = e.target.closest('.checkbox');
    if (!checkbox) return;

    const targetTask = e.target.closest('.task');
    await handler(targetTask);
  });
};

// could use toggle instead of add/remove REMINDER

const renderConfirmPopup = function (show) {
  const confOverlayEl = document.querySelector('.confirm__overlay');

  // toggle hidden
  show
    ? confOverlayEl.classList.remove('hidden')
    : confOverlayEl.classList.add('hidden');
};

const handleConfirmPopup = function (handler) {
  const popupConfirmEl = document.querySelector('.popup__confirm__down');
  const confOverlayEl = document.querySelector('.confirm__overlay');

  popupConfirmEl.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.classList.contains('confirm__btn')) handler(1);
    else if (btn.classList.contains('noconfirm__btn')) handler(0);
  });

  confOverlayEl.addEventListener('click', e => {
    const clickedEl = e.target;
    if (!(clickedEl === confOverlayEl)) return;
    handler(0);
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

  btnParentEl.addEventListener('click', async function (e) {
    const btn = e.target.closest('.submit__btn');
    // func to check conditions
    if (!btn) return;
    if (!inputEl.value) return;

    // =====================================
    const newTitle = document.querySelector('.title-input');
    const newDesc = document.getElementById('descInput');
    const newAgents = document.querySelector('.user__name');
    const newDeadline = document.getElementById('dateInput');
    const taskContainerEl = document.querySelector('.task__container');

    const payload = {
      title: newTitle.value,
      description: newDesc.value,
      agents: [newAgents.dataset.userId],
      deadline: newDeadline.value
    };
    console.log(payload);

    // POST task to DB
    const tskData = await model.addNewTask(payload);
    console.log(tskData);

    // NO ERROR HANDLING APPLIED HERE BUG
    // show success message (with a timer)

    // hide overlay
    overlayEl.classList.add('hidden');

    // re-initialize popup input (remove user inputs)
    newTitle.value = '';
    newDesc.value = '';
    newDeadline.value = '';
    removePopupUsers();

    // taskContainerEl.innerHTML = '';

    // const taskNavEl = document.querySelector('.my__tasks');
    // const activeNavEl = document.querySelector('.nav__item-active');
    // if (taskNavEl !== activeNavEl) {
    //   taskNavEl.classList.add('nav__item-active');
    //   activeNavEl.classList.remove('nav__item-active');
    // }

    // in addition to this we need to change nav to ongoing tasks BUG
    // await view.renderHTML(
    //   generateSingleTask.bind(null, false, tskData),
    //   taskContainerEl
    // );
    console.log(
      document
        .querySelector('.nav__item-active')
        .classList.contains('my__tasks')
    );

    if (
      document
        .querySelector('.nav__item-active')
        .classList.contains('my__tasks')
    ) {
      taskContainerEl.insertAdjacentHTML(
        'beforeend',
        generateSingleTask(false, tskData)
      );
      incrementTaskNum();
    }

    // =====================================
    // /tasks/gettasks (route to get tasks)
    // =====================================

    // show success message

    // re-render tasks list
    // const taskContainerEl = document.querySelector('.task__container');
    // taskContainerEl.innerHTML = '';
    // view.renderHTML(generateTaskContainer, taskContainerEl);
    // inputEl.value = '';
    // timeInputEl.value = '';
    // persistTasks();
  });
};

const incrementTaskNum = function () {
  const taskHint = document.querySelector('.hint-text');
  taskHint.children[0].textContent =
    Number(taskHint.children[0].textContent) + 1;
  // taskHint.children[0].textContent = Number(taskHint.children[0].textContent)++;
};

const generateTaskContainer = async function (status) {
  const tasksData = await model.getTasks();
  if (!tasksData) {
    console.error('taskData returns nothing');

    return;
  }

  return `
              <span class="hint-text">وظایف امروز (<span>${tasksData.reduce(
                (acc, task) => {
                  if (task.status == status) acc++;
                  return acc;
                },
                0
              )}</span> مورد)</span>
            <ul class="task__list">
            ${tasksData.map(generateSingleTask.bind(null, status)).join('')}
          </ul>

  `;
};

const generateSingleTask = function (status, task) {
  let i = 0;
  let markup;
  // console.log(task);

  if (task.status === status) {
    markup = `
    <li class="task" data-task-status="${task.status}" data-task-id="${
      task.id
    }">
    <div class="task__right">
      <input class="checkbox" type="checkbox" ${
        status ? 'checked' : ''
      } data-id=${task.id} />
      <span class="task-text">${task.title}</span>
    </div>
    <div class="task__left">
      <div class="assignedto">
        ${task.agents
          .map(person => {
            i++;

            return `<div class="initial ${i == 1 ? '' : `initial-${i}`}">${
              person.username[0]
            }</div>`;
          })
          .join('')}
      </div>
      <span class="deadline">${generateDeadlineTxt(task.deadline)}</span>
          <button class="referBtn">ارجاع</button>
          <button class="fa fa-times deleteTaskBtn"></button>
    </div>
    </li>
    `;
  }

  i = 0;

  return markup;
};

const generateDeadlineTxt = days => {
  if (days > 0) return `${days} روز مانده`;
  else if (days === 0) return `<strong>امروز</strong>`;
  else return `${-days} روز گذشته`;
};

const handleDeleteTask = async function (taskId) {
  try {
    const data = await deleteAPI(`deletetask/${taskId}`);
    return true;
  } catch (error) {
    return false;
  }
};

const removeTaskEl = taskEl => view.removeHTML(taskEl);

export default {
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
  handleReferralsBtn,
  handleConfirmPopup,
  renderConfirmPopup,
  removeTaskEl
};
