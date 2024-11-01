import view from '/js/views/view.js';

const parentEl = document.querySelector('.menu');

const collapseMenu = function () {
  const containerEl = document.querySelector('.container');
  const menuList = document.querySelector('.menu > ul');
  menuList.classList.toggle('noOpacity');
  const menuItemSpans = document.querySelectorAll('.menu__item > span');

  parentEl.classList.toggle('collapse');
  containerEl.classList.toggle('fullscreen');
  menuItemSpans.forEach(span => span.classList.toggle('hidden'));
};

const handleMenuChange = function (handler) {
  // catch clicked menu item
  parentEl.addEventListener('click', function (e) {
    const menu = e.target.closest('.menu__item');
    if (!menu || menu.classList.contains('menu-active')) return;

    handler(menu);
  });
};

const switchActiveEl = function (targetMenu) {
  // remove active class from current active menu
  parentEl.querySelector('.menu-active')?.classList.remove('menu-active');

  // add active class to clicked menu item
  targetMenu.classList.add('menu-active');
};

export default { collapseMenu, handleMenuChange, switchActiveEl };
