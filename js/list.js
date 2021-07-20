// FETCH API FOR SEACRH
let changeLandingPage = function () {
    localStorage.setItem('movieId', this.id);
    window.location.replace('landing-page.html');
}

let movieNumbers = localStorage.getItem('movieNumbers');
if (movieNumbers) {
    document.querySelector('.cart span').textContent = movieNumbers;
}

let movieArray = localStorage.getItem('moviesInCart');
movieArray = JSON.parse(movieArray)

fetch(`http://localhost:3000/movie_results`)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        const datafullList = [];
        for (j = 0; j < data.length; j++) {
            datafullList.push(...data[j])
        }
        const dataListresult = [];
        movieArray.forEach((item) => {
            for (let i = 0; i < datafullList.length; i++) {
                // console.log(datafullList[i].imdb_id)
                if (datafullList[i].imdb_id == item) {
                    document.getElementById("movie_results").innerHTML += `<div class="movie_result">
                    <img class="movie-result-img" src="${datafullList[i].fanart}" alt="">
                    <div class="movie-result-info">
                        <span class="movie-result-item-title "> ${datafullList[i].title} </span>
                        <button class="movie-result-item-button movie-result-item-button-watch">Watch</button>
                        <button class="movie-result-item-button movie-result-item-button-remove">Remove</button>
                    </div>`;

                    dataListresult.push(datafullList[i]);
                    let movie_id = document.getElementsByClassName('movie-result-item-button-watch');
                    for (let k = 0; k < dataListresult.length; k++) {
                        movie_id[k].id = dataListresult[k].imdb_id;
                        movie_id[k].onclick = changeLandingPage;
                    }

                    let tempMovieId = localStorage.getItem('moviesInCart');
                    tempMovieId = JSON.parse(tempMovieId);
                    let movie_id_remove = document.getElementsByClassName('movie-result-item-button-remove');
                    for (let i = 0; i < dataListresult.length; i++) {
                        movie_id_remove[i].id = dataListresult[i].imdb_id;
                        movie_id_remove[i].addEventListener('click', () => {
                            if (confirm('Are you sure you want to remove this movie?')) {
                                let index = tempMovieId.indexOf(dataListresult[i].imdb_id);
                                // array.splice(index, 1);
                                console.log(tempMovieId)
                                tempMovieId.splice(index, 1);
                                console.log(tempMovieId);
                                localStorage.setItem('moviesInCart', JSON.stringify(tempMovieId))
                                let parentDiv = document.getElementById(dataListresult[i].imdb_id).parentNode;
                                parentDiv.parentNode.remove();
                                let movieNumbers = localStorage.getItem('movieNumbers');

                                movieNumbers = parseInt(movieNumbers);
                                localStorage.setItem('movieNumbers', movieNumbers - 1);
                                document.querySelector('.cart span').textContent = movieNumbers - 1;
                                console.log('Thing was saved to the database.');
                            }
                        })
                    }
                }
            }
        })



        if (dataListresult.length == 0) {
            document.getElementById("movie_results").innerHTML += `<h3> We cannot find any results </h3>`;
        }
    })
    .catch(err => {
        console.error(err);
    });

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
