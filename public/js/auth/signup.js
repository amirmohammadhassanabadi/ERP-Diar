document.getElementById("signUpBtn").addEventListener("click", e => {
    fetch("/auth/adduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
            confirmPassword: document.getElementById("confirmPasswordInput").value,
            department: document.getElementById("department").value,
            level: document.getElementById("level").value,
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
})