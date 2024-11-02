import view from '/js/views/view.js';

const parentEl = document.querySelector('header');

const handleMenuBtn = function (handler) {
  parentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.menu__btn');
    if (!btn) return;

    handler();
  });
};

//post /auth/changepassword
const handleProfileBtn = function (handler) {
  const profileBtn = document.querySelector('.user__profile');
  profileBtn.addEventListener('click', function (e) {
    handler(e.target);
  });
};

const handlePassChangeBtn = function (handler) {
  const btn = document.querySelector('.change__pas__btn');
  btn.addEventListener('click', () => {
    handler();
  });
};

const handleUserInfoClosure = function (handler) {
  document.addEventListener('click', e => {
    if (
      !e.target.closest('.profile__info__list') &&
      !e.target.closest('.user__profile')
    ) {
      handler();
    }
  });
};

export default {
  handleMenuBtn,
  handleProfileBtn,
  handlePassChangeBtn,
  handleUserInfoClosure
};
