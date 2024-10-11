const renderHTML = function (generateMarkup, parentEl) {
  parentEl.insertAdjacentHTML('afterbegin', generateMarkup());
};

// const clearElement = function (el) {
//   el.innerHTML = '';
// };

export default { renderHTML };
