import { getAPI, postAPI, deleteAPI } from "/js/API/fetch.js";
import { popupHandler } from "/js/includes/popup.js";

document.querySelector(".container").addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-user")) {
        const id = e.target.parentElement.dataset.userid;
        
        const response = await deleteAPI("/admin/removeuser/" + id);
        if (response.statusCode == 200) {
            popupHandler(200, "کاربر با موفقیت حذف شد");
            e.target.parentElement.parentElement.remove();
        }
        
        
    }
})