// NAVBAR
const menuBtn = document.querySelector(".menu-icon span")
const cancelBtn = document.querySelector(".cancel-icon")
const items = document.querySelector(".nav-items")
const form = document.querySelector(".form")

menuBtn.onclick = () => {
    items.classList.add("active")
    menuBtn.classList.add("hide");
    cancelBtn.classList.add("show")
}

cancelBtn.onclick = () => {
    items.classList.remove("active")
    menuBtn.classList.remove("hide");
    cancelBtn.classList.remove("show")

}

function scrollToBottom() {
    $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
}

// Kiem tra xem da log in hay chua
const lastUserJSON = localStorage.getItem("last_User");
const lastUserJSONConvert = JSON.parse(lastUserJSON);
const getLognin = document.getElementById("nameUser");
console.log(getLognin.innerText);
getLognin.innerText = lastUserJSONConvert.email;
if (getLognin.innerText == 'undefined') {
    getLognin.innerText = 'Log in';
}
document.querySelector("#LogOutUser").addEventListener("click", () => {
    // e.preventDefault();
    console.log('xoa');
    let last_User = [];
    localStorage.setItem("last_User", JSON.stringify(last_User));
    getLognin.innerText = "Log in";
    localStorage.removeItem('moviesInCart');
    localStorage.removeItem('movieNumbers');
    location.reload();
})