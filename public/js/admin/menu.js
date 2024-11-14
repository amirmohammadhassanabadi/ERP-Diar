function containerReseter() {
    document.querySelector(".container").innerHTML = "";
}

document.querySelector(".menu").addEventListener("click", e => {
    if (e.target.classList.contains("user-setting") || e.target.parent.classList.contains("user-setting")) {
        containerReseter();
        
    }
})