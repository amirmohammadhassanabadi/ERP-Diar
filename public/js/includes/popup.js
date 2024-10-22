function popupStyle(mainElement, contentElement, bg, color) {
    mainElement.style.backgroundColor = bg;
    mainElement.style.border = `2px solid ${color}`;
    contentElement.style.color = color;
}

function popupHandler(statusCode, containerElement, mainElement, contentElement, message) {
    if (statusCode == 200) {
        popupStyle(mainElement, contentElement, "var(--popup-success-bg)", "var(--popup-success-200-bg)");
    }else{
        popupStyle(mainElement, contentElement, "var(--light-red)", "var(--red)");
    }
  containerElement.style.animation =
    "showAlert 1s ease forwards";
    contentElement.innerText = message;
  setTimeout(() => {
    containerElement.style.animation =
      "hideAlert 1s ease forwards";
  }, 5000);
}

export {popupHandler}