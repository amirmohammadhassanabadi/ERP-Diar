function popupStyle(mainElement, contentElement, bg, color) {
    mainElement.style.backgroundColor = bg;
    mainElement.style.border = `2px solid ${color}`;
    contentElement.style.color = color;
}

function popupHandler(statusCode, message) {
    if (statusCode == 200) {
        popupStyle(document.querySelector(".main-alert"), document.querySelector(".main-alert > h3"), "var(--popup-success-bg)", "var(--popup-success-200-bg)");
    }else{
        popupStyle(document.querySelector(".main-alert"), document.querySelector(".main-alert > h3"), "var(--light-red)", "var(--red)");
    }
  document.querySelector(".alert-wrapper").style.animation =
    "showAlert 1s ease forwards";
    document.querySelector(".main-alert > h3").innerText = message;
  setTimeout(() => {
    document.querySelector(".alert-wrapper").style.animation =
      "hideAlert 1s ease forwards";
  }, 5000);
}

export {popupHandler}