import { getAPI, postAPI } from "/js/API/fetch.js";

function containerReseter() {
    document.querySelector(".container").innerHTML = "";
}

document.querySelector(".menu").addEventListener("click", e => {
    if (e.target.classList.contains("user-setting") || e.target.parent.classList.contains("user-setting")) {
        containerReseter();
        let userCont = `
            <div class="user-add-wrapper">
              <a href="/auth/signup">افزودن کاربر</a>
            </div>
        `;


        document.querySelector(".container").innerHTML = userCont;
    }
})