// DOM Variables
const loginWrapper = document.querySelector(".login-wrapper");
const errorContent = document.querySelector(".main-alert>h3");
const usernameInput = document.querySelector(".input-wrapper > input");
const passwordInput = document.querySelector(".password-input-wrapper > input");
console.log(passwordInput);

function postInformation() {
  fetch("/auth/postlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (data.message == "admin") {
          location.href = "/admin/profile";
        }else{
          location.href = `/`;
        }
      } else if (data.status === 404) {
        errorHandler("نام کاربری یا رمز عبور نادرست است");
      } else if (data.status === 500) {
        errorHandler("مشکلی پیش آمده لطفا لحظاتی دیگر دوباره تلاش کنید");
      }
    });
}

function errorHandler(message) {
  document.querySelector(".alert-wrapper").style.animation =
    "showAlert 1s ease forwards";
  errorContent.innerText = message;
  setTimeout(() => {
    document.querySelector(".alert-wrapper").style.animation =
      "hideAlert 1s ease forwards";
  }, 5000);
}

loginWrapper.addEventListener("click", (e) => {
  if (e.target.id == "showIcon") {
    if (e.target.parentElement.nextElementSibling.type == "text") {
      e.target.parentElement.nextElementSibling.type = "password";
      e.target.classList = "fa-solid fa-eye";
    } else {
      e.target.parentElement.nextElementSibling.type = "text";
      e.target.classList = "fa-solid fa-eye-slash";
    }
  } else if (e.target.id == "logInBtn") {
    postInformation();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    postInformation();
  }
});
