import view from '/js/view.js';

const parentEl = document.querySelector('.menu');

const collapseMenu = function () {
  const containerEl = document.querySelector('.container');

  parentEl.classList.toggle('collapse');
  containerEl.classList.toggle('fullscreen');
};

export default { collapseMenu };
