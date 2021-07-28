document.querySelector(".linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    let formSignin = document.querySelector("#signin");
    let formHiden = document.querySelector("#createAccount");
    formSignin.classList.add("form__hiden");
    formHiden.classList.remove("form__hiden");
});

document.querySelector(".linkSigninAccount").addEventListener("click", e => {
    e.preventDefault();
    let formSignin = document.querySelector("#signin");
    let formHiden = document.querySelector("#createAccount");
    formSignin.classList.remove("form__hiden");
    formHiden.classList.add("form__hiden");
});

function messageError(inputElement, message) {
    inputElement.classList.add("form__error");
    inputElement.parentElement.querySelector(".form__mesageError").innerText = message
}

function clearMessageError(inputElement) {
    inputElement.classList.remove("form__error");
    inputElement.parentElement.querySelector(".form__mesageError").innerText = "";
}
document.querySelectorAll(".form__input-signUp").forEach(function (inputElement) {
    inputElement.addEventListener("blur", e => {
        if (e.target.id == "form_username-CreateAccount" && e.target.value.length > 0 && e.target.value.length < 6) {
            messageError(inputElement, "Username must be at least 6 characters in length");
        }
        if (e.target.id == "form_email-cretaAccount" && e.target.value.length > 0 && e.target.value.length < 6) {
            messageError(inputElement, "Email is invalid");
        }
        inputElement.addEventListener("input", e => {
            clearMessageError(inputElement)

        })
    })
})

//-----------Sign Up------------------------//

if (JSON.parse(localStorage.getItem("infor_users")) == null) {
    localStorage.setItem("infor_users", JSON.stringify([]));
}

document.querySelector(".form__button-signUp").addEventListener("click", function () {

    let inforJSON = localStorage.getItem("infor_users");
    let inforJSONConvert = JSON.parse(inforJSON);
    let users = {};
    let formUsernameCreateAccount = document.getElementById("form_username-CreateAccount");
    let formEmailcretaAccount = document.getElementById("form_email-cretaAccount");
    let formPasswordCretaAccount = document.getElementById("form_password-cretaAccount");
    let formConfirmPasswordCretaAccount = document.getElementById("form_confirmPassword-cretaAccount");
    if (formUsernameCreateAccount.value == "" || formEmailcretaAccount.value == ""
        || formPasswordCretaAccount.value == "" || formConfirmPasswordCretaAccount.value == "") {
        alert("Complete the information")
    } else {
        users.UserName = document.querySelector(".form__userName").value;
        users.emailAddress = document.querySelector(".form__email").value;
        users.password = document.querySelector(".form__password").value;
        inforJSONConvert.push(users);
        localStorage.setItem("infor_users", JSON.stringify(inforJSONConvert));
        window.location.reload()
    }
})

//------------Sign In------------------------//

document.querySelector(".form__button-signIn").addEventListener("click", function () {
    let usersJSON = localStorage.getItem("infor_users");
    let usersJSONconvert = JSON.parse(usersJSON);
    // console.log(usersJSONconvert)
    let signinEmail = document.getElementById("form__email");
    let signinPassword = document.getElementById("form__password");
    for (let item of usersJSONconvert) {
        let lastUser = {};

        if (item.emailAddress == signinEmail.value && item.password == signinPassword.value) {
            lastUser.email = signinEmail.value;
            lastUser.password = signinPassword.value;
            localStorage.setItem("last_User", JSON.stringify(lastUser))
            window.location.href = "index.html";
        }
    }
})

