const renderHTML = function (generateMarkup, parentEl) {
  parentEl.insertAdjacentHTML('afterbegin', generateMarkup());
};

const clear = function (el) {
  el.innerHTML = '';
};

export default { renderHTML, clear };
