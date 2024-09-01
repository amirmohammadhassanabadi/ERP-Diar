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
    fetch("/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.parentElement.children[0].value,
        password: e.target.parentElement.children[1].children[1].value,
        department: "it",
        test: "test"
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
});
