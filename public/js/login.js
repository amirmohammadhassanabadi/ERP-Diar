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
  } else if (e.target.id == "logInBtn") { 
    fetch("/auth/postlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.parentElement.children[0].value,
        password: e.target.parentElement.children[1].children[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          location.href = `/user/profile/${data.data.userId}`
        }
      });
  }
});
