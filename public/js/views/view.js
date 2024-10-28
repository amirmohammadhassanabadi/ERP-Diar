const renderHTML = async function (generateMarkup, parentEl) {
  const markup = await generateMarkup();
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const clear = function (el) {
  el.innerHTML = '';
};

export default { renderHTML, clear };
