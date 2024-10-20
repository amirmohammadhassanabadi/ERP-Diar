jalaliDatepicker.startWatch({
    minDate: "attr",
    maxDate: "attr",
    time: true,
});
const popup__container = document.querySelector(".popup__container");

popup__container.addEventListener("click", (e) => {
  if(e.target.classList[0] == "submit__btn"){
    if (e.target.parentElement.previousElementSibling.children[2].children[2] && e.target.parentElement.previousElementSibling.children[2].children[2].id == "agentReferrals") {
      fetch("auth/user/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "title": document.querySelector(".title-input").value,
          "description": document.getElementById("descInput"),
          "deadline": document.getElementById("dateInput")
        })
      })
      .then(res => res.json()).then(data => {
          console.log(data);
          
      })
    }
  }
});

