import { popupHandler } from "../includes/popup.js";

document.getElementById("signUpBtn").addEventListener("click", (e) => {
  fetch("/auth/adduser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("usernameInput").value,
      password: document.getElementById("passwordInput").value,
      confirmPassword: document.getElementById("confirmPasswordInput").value,
      department: document.getElementById("department").value,
      level: document.getElementById("level").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode === 200) {
        popupHandler(
          200,
          document.querySelector(".alert-wrapper"),
          document.querySelector(".main-alert"),
          document.querySelector(".main-alert > h3"),
          "کابر با موفقیت ثبت نام شد"
        );
      } else if (data.statusCode === 400) {
        let msg = ""
        if (data.message === "Password must be at least 8 characters long") {
            msg = "رمز عبور (password) باید حداقل 8 کارکتر باشد";
        }else if(data.message === "Department is not defined"){
            msg  = "گروه (department) باید تعریف شده باشد";
        }else if(data.message === "level is not defined'"){
            msg = "گروه (user level) باید تعریف شده باشد";
        }else {
            msg = "رمز عبور و تکرار رمز عبور نباید مغایرت داشته باشند"
        }
        popupHandler(
            400,
            document.querySelector(".alert-wrapper"),
            document.querySelector(".main-alert"),
            document.querySelector(".main-alert > h3"),
            msg
          );
      }else if(data.statusCode === 409){
        popupHandler(
            409,
            document.querySelector(".alert-wrapper"),
            document.querySelector(".main-alert"),
            document.querySelector(".main-alert > h3"),
            "نام کاربری تکراری است"
          );
      }else if (data.statusCode === 500) {
        popupHandler(
          500,
          document.querySelector(".alert-wrapper"),
          document.querySelector(".main-alert"),
          document.querySelector(".main-alert > h3"),
          "مشکلی پیش اومده لطفا دقایقی دیگر دوباره تلاش کنید"
        );
      }
    })
    .catch((err) => {
      console.log("error: " + err.message);
    });
});
