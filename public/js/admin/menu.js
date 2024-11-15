import { getAPI, postAPI } from "/js/API/fetch.js";
import { popupHandler } from "/js/includes/popup.js";

function containerReseter() {
    document.querySelector(".container").innerHTML = "";
}

function renderUsers(users) {
    return users.map(user => {
        return `
            <div class="users-box">
              <div class="profile-img-wrapper">
                <div style="background-color: ${user.color};" >
                  <div>${user.username[0].toUpperCase()}${user.username[1].toUpperCase()}</div>
                </div>
              </div>
              <div class="user-info">
                <span>${user.fullName}</span>
                <span>${user.username}</span>
                <span>سطح ${user.level}</span>
                <span>واحد ${user.department}</span>
              </div>

              <div class="btns">
                <button data-userid="${user._id}">ویرایش</button>
                <button>حذف</button>
              </div>
            </div>
        `
    })
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
        if (response.statusCode == 200) {
            userCont += `
                <div class="users-container">
                    <div class="users-box-container">
                        ${renderUsers(response.data).join()}
                    </div>
                </div>
            `
        }
        

        document.querySelector(".container").innerHTML = userCont;
    }
})