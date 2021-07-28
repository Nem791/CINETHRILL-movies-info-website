
// SLIDER 
const arrowsRight = document.querySelectorAll(".right");
// // console.log (arrows) -> Arrows là 1 array

const movieLists = document.querySelectorAll(".movie-list")
// console.log(movieLists[1])



arrowsRight.forEach((arrowRight, i) => {
    let clickCounter = 0;
    arrowRight.addEventListener("click", () => {
        clickCounter++;
        if (clickCounter < 6) {
            movieLists[i].style.transform = `translateX(${-clickCounter * 230}px)`
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }



    })
})


// FETCH API
const movie_titles = document.getElementsByClassName("movie-list-item-title");
const movie_desc = document.getElementsByClassName("movie-list-item-desc");
const movie_img = document.getElementsByClassName("movie-list-item-img");
const movie_id1 = document.getElementsByClassName('movie-list-item-button');
fetch(`https://movie-api791.herokuapp.com/api/movie_results`)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(movie_titles);
        for (i = 0; i < movie_titles.length; i++) {
            movie_titles[i].innerText = data[0][i].title;
            movie_desc[i].innerText = data[0][i].year;
            movie_img[i].src = data[0][i].fanart;
            movie_id1[i].id = data[0][i].imdb_id;
            movie_id1[i].onclick = click_function;
        }
    })
    .catch(err => {
        console.error(err);
    });
    let click_function = function() {
        localStorage.setItem('movieId', this.id);
        window.location.replace('landing-page.html');
    }

// Log in Log out. Kiem tra xem da log in hay chua
const lastUserJSON = localStorage.getItem("last_User");
const lastUserJSONConvert = JSON.parse(lastUserJSON);
const getLognin = document.getElementById("nameUser");
getLognin.innerText = lastUserJSONConvert.email;
if (getLognin.innerText == 'undefined') {
    getLognin.innerText = 'Log in';
} else {
    getLognin.href = "#"
}

document.querySelector("#LogOutUser").addEventListener("click", () => {
    console.log('xoa');
    let last_User = [];
    localStorage.setItem("last_User", JSON.stringify(last_User));
    getLognin.innerText = "Log in";
    localStorage.removeItem('moviesInCart');
    localStorage.removeItem('movieNumbers');
    location.reload();
})