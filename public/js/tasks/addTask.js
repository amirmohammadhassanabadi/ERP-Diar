jalaliDatepicker.startWatch({
    minDate: "attr",
    maxDate: "attr",
    time: true,
});
const popup__container = document.querySelector(".popup__container");

popup__container.addEventListener("click", (e) => {
  if(e.target.classList[0] == "submit__btn"){
      fetch("auth/user/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "title": document.querySelector(".title-input").value,
          "description": document.getElementById("descInput"),
          "deadline": document.getElementById("dateInput"),
          "agent": []
        })
      })
      .then(res => res.json()).then(data => {
          console.log(data);
          
      })

  }else if(e.target.classList[0] == "agent-btn"){
    fetch("/tasks/agent", {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  } 
});

