const renderHTML = async function (generateMarkup, parentEl) {
  const markup = await generateMarkup();
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const clear = function (el) {
  el.innerHTML = '';
};

const removeHTML = function (el) {
  el.remove();
};

export default { renderHTML, clear, removeHTML };

// err list : 408 empty title, 409wrong data input
