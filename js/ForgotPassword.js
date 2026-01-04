let emailForm = document.getElementById("email")
let passwordForm = document.getElementById("password")
let emailIs = document.getElementById("user_email")
let submitEmail = document.getElementById("submit_email")
let newPassword = document.getElementById("new_password")
let confirmPassword = document.getElementById("confirm_password")
const data = JSON.parse(localStorage.getItem("GAMEON"))
const users = data.USERS

emailForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const emailValue = emailIs.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(emailValue)) {
        emailIs.value = ""
        emailIs.placeholder = "Enter a valid email"
        emailIs.style.border = "1px solid red"
        return
    }

    const foundUser = users.find(user => user.user_email === emailValue)

    if (!foundUser) {
        emailIs.value = ""
        emailIs.placeholder = "Email not registered"
        emailIs.style.border = "1px solid red"
        return
    }

    currentUser = foundUser
    emailForm.classList.remove("active")
    passwordForm.classList.add("active")
})
passwordForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const passwordValue = newPassword.value.trim()
    const confirmValue = confirmPassword.value.trim()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/

    if (!passwordRegex.test(passwordValue)) {
        newPassword.value = ""
        newPassword.placeholder = "Strong password required"
        newPassword.style.border = "1px solid red"
        return
    }

    if (passwordValue !== confirmValue) {
        confirmPassword.value = ""
        confirmPassword.placeholder = "Passwords do not match"
        confirmPassword.style.border = "1px solid red"
        return
    }

    currentUser.user_password = passwordValue
    localStorage.setItem("GAMEON", JSON.stringify(data))
    window.location.href = "Login.html"
})