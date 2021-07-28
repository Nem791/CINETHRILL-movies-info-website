// NAVBAR
const menuBtn = document.querySelector(".menu-icon span")
const cancelBtn = document.querySelector(".cancel-icon")
const items = document.querySelector(".nav-items")
const form = document.querySelector(".form")

menuBtn.onclick = () => {
    items.classList.add("active");
    menuBtn.classList.add("hide");
    cancelBtn.classList.add("show");
}

cancelBtn.onclick = () => {
    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    // cancelBtn.classList.remove("show");
}