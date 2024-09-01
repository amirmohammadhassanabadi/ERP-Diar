// DOM Variables
const loginWrapper = document.querySelector(".login-wrapper");

loginWrapper.addEventListener("click", (e) => {
  if (e.target.id == "showIcon") {
    if (e.target.parentElement.nextElementSibling.type == "text") {
      e.target.parentElement.nextElementSibling.type = "password";
      e.target.classList = "fa-solid fa-eye";
    } else {
      e.target.parentElement.nextElementSibling.type = "text";
      e.target.classList = "fa-solid fa-eye-slash";
    }
  }else if(e.target.id == "showIcon"){
    
  }
});