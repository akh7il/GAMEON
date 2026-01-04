let messageIs = document.querySelector(".message")
let subMessageIs = document.querySelector(".sub_message")
let loginForm = document.querySelector(".login_form")
let signUpForm = document.querySelector(".signup_form")
let toggleBtn = document.getElementById("toggle")

let userName = document.querySelectorAll(".user_name")
let userEmail = document.querySelectorAll(".user_email")
let userPassword = document.querySelectorAll(".user_password")

let userPhone = document.getElementById("signup_phone")
let signupUserName = document.getElementById("signup_username")
let signupUserEmail = document.getElementById("signup_email")
let signupUserPassword = document.getElementById("user_signup_password")

let loginUserName = document.getElementById("login_username")
let loginEmail = document.getElementById("login_email")
let loginPassword = document.getElementById("login_password")

let signUpIsVisible = false

if (!localStorage.getItem("GAMEON")) {
    localStorage.setItem("GAMEON", JSON.stringify({ USERS: [] }))
}

toggleBtn.addEventListener("click", () => {
    if (!signUpIsVisible) {
        loginForm.style.display = "none"
        signUpForm.style.display = "flex"
        messageIs.textContent = "sign up account"
        subMessageIs.textContent = "create account"
        toggleBtn.textContent = "back to login"
    } else {
        signUpForm.style.display = "none"
        loginForm.style.display = "flex"
        messageIs.textContent = "log in account"
        subMessageIs.textContent = "welcome back"
        toggleBtn.textContent = "create account"
    }
    signUpIsVisible = !signUpIsVisible
})

userName.forEach(name => {
    name.addEventListener("input", e => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "")
    })
})

userEmail.forEach(email => {
    email.addEventListener("input", e => {
        e.target.value = e.target.value.replace(/[^\w@.-]/g, "")
    })
})

userPassword.forEach(password => {
    password.addEventListener("input", e => {
        e.target.value = e.target.value.replace(/[^\w@$!%*?&]/g, "")
    })
})

userPhone.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "")
})

function showInputError(input, message) {
    input.classList.add("input-error")
    input.value = ""
    input.placeholder = message
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("input-error")
    })
})

signUpForm.addEventListener("submit", e => {
    e.preventDefault()

    if (signupUserName.value.trim().length < 4) {
        showInputError(signupUserName, "name min 4 chars")
        return
    }

    if (!signupUserEmail.value.includes("@")) {
        showInputError(signupUserEmail, "enter valid email")
        return
    }

    if (userPhone.value.length !== 10) {
        showInputError(userPhone, "10 digit phone only")
        return
    }

    let password = signupUserPassword.value
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/

    if (!passwordRegex.test(password)) {
        showInputError(
            signupUserPassword,
            "use A-Z a-z 0-9 & symbol"
        )
        return
    }

    let users = JSON.parse(localStorage.getItem("GAMEON"))

    let emailExists = users.USERS.some(
        user => user.user_email.toLowerCase() === signupUserEmail.value.toLowerCase()
    )

    if (emailExists) {
        showInputError(signupUserEmail, "email already exists")
        return
    }

    users.USERS.push({
        user_name: signupUserName.value,
        user_email: signupUserEmail.value,
        user_phone: userPhone.value,
        user_password: signupUserPassword.value
    })

    localStorage.setItem("GAMEON", JSON.stringify(users))
    window.location.href = "./GameOn.html"
})
loginForm.addEventListener("submit", e => {
    e.preventDefault()

    if (!loginUserName.value) {
        showInputError(loginUserName, "enter username")
        return
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(loginEmail.value)){
        showInputError(loginEmail, "invalid email")
        return
    }

    if (!loginPassword.value) {
        showInputError(loginPassword, "enter password")
        return
    }

    let userData = JSON.parse(localStorage.getItem("GAMEON"))

    let userLogged = userData.USERS.find(user =>
        user.user_name.toLowerCase() === loginUserName.value.toLowerCase() &&
        user.user_email.toLowerCase() === loginEmail.value.toLowerCase() &&
        user.user_password === loginPassword.value
    )

    if (!userLogged) {
        [loginUserName, loginEmail, loginPassword].forEach(input => {
            showInputError(input, "invalid login details")
        })
        return
    }

    window.location.href = "./GameOn.html"
})