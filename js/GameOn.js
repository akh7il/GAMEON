let category = document.querySelectorAll(".category")
let pages = document.querySelectorAll(".page")

category.forEach((category)=>{
    category.addEventListener("click", ()=>{
        let displayPage = category.dataset.target
        pages.forEach((pageIs)=>{
            pageIs.classList.remove("active")
        })
        document.getElementById(displayPage).classList.add("active")
    })
})

window.addEventListener("load",()=>{
    document.getElementById("GameController").style.bottom = "0"
    setTimeout(()=>{
        document.getElementById("GameOn").style.opacity = 1
        document.getElementById("GameOn").style.bottom = "300px"
    },1500)
})

document.addEventListener("DOMContentLoaded", () => {
    let contactUserName = document.getElementById("username");
    let contactUserEmail = document.getElementById("user_email");
    let contactForm = document.getElementById("contact_form");
    let statusIs = document.getElementById("status");
    contactUserName.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    });

    contactUserEmail.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^\w@.-]/g, "");
    });
    emailjs.init("-ZkShO15cCBU700Kp");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        statusIs.textContent = "Sending...";

        emailjs.send("service_p5w40b1", "template_cul1vh7", {
            name: contactUserName.value.trim(),
            email: contactUserEmail.value.trim(),
            message: document.getElementById("message").value.trim()
        })
        .then(() => {
            statusIs.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch(() => {
            statusIs.textContent = "Failed to send message. Try again!";
        });
    });
});
