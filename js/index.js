
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
} else {
    getLognin.href = "#"
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

function changetoSearch() {
    window.location.replace('search.html');
}

let movieNumbers = localStorage.getItem('movieNumbers');
if (movieNumbers) {
    document.querySelector('.cart span').textContent = movieNumbers;
}
