import view from '/js/views/view.js';

const parentEl = document.querySelector('header');

const handleMenuBtn = function (handler) {
  parentEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.menu__btn');
    if (!btn) return;

    handler();
  });
};

export default { handleMenuBtn };
