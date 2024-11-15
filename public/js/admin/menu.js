import { getAPI, postAPI } from "/js/API/fetch.js";

function containerReseter() {
    document.querySelector(".container").innerHTML = "";
}

document.querySelector(".menu").addEventListener("click", async e => {
    if (e.target.classList.contains("user-setting") || e.target.parentElement.classList.contains("user-setting")) {
        containerReseter();
        let userCont = `
            <div class="user-add-wrapper">
              <a href="/auth/signup">افزودن کاربر</a>
            </div>
        `;

        const response = await getAPI("/admin/getallusers");
        console.log(response);
        

        document.querySelector(".container").innerHTML = userCont;
    }
})