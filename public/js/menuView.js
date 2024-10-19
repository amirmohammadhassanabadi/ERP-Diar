import view from '/js/view.js';

const parentEl = document.querySelector('.menu');

const collapseMenu = function () {
  const containerEl = document.querySelector('.container');

  parentEl.classList.toggle('collapse');
  containerEl.classList.toggle('fullscreen');
};

const handleMenuChange = function (handler) {
  // catch clicked menu item
  parentEl.addEventListener('click', function (e) {
    const menu = e.target.closest('.menu__item');
    if (!menu || menu.classList.contains('menu-active')) return;

    // 1. switch active class
    switchActiveEl(menu);

    // 2. render placeholder data REMINDER

    // 3. render desired menu
    if (menu.classList.contains('menu__dashboard')) handler(1);
    else if (menu.classList.contains('menu__tasks')) handler(2);
  });
};

const switchActiveEl = function (targetMenu) {
  // remove active class from current active menu
  parentEl.querySelector('.menu-active')?.classList.remove('menu-active');

  // add active class to clicked menu item
  targetMenu.classList.add('menu-active');
};

export default { collapseMenu, handleMenuChange, switchActiveEl };
