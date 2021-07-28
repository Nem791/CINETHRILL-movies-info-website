// FETCH API FOR SEACRH

function changetoSearch() {
    window.location.replace('search.html');
}

let changeLandingPage = function () {
    localStorage.setItem('movieId', this.id);
    window.location.replace('landing-page.html');
}

let movieNumbers = localStorage.getItem('movieNumbers');
if (movieNumbers) {
    document.querySelector('.cart span').textContent = movieNumbers;
}


function searchFilm() {
    let x = document.getElementById("search-data").value;
    console.log(x)
    document.getElementById("movie_results").innerHTML = ""
    fetch(`https://movie-api791.herokuapp.com/api/movie_results`)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            const datafullList = [];
            for (j = 0; j < data.length; j++) {
                datafullList.push(...data[j])
            }
            console.log(datafullList)
            const dataListresult = [];
            console.log(dataListresult)
            console.log(datafullList[1].title)
            for (let i = 0; i < datafullList.length; i++) {
                if (datafullList[i].title.includes(x) || datafullList[i].title.toLowerCase().includes(x) || datafullList[i].title.toUpperCase().includes(x)) {
                    document.getElementById("movie_results").innerHTML += `<div class="movie_result">
                <img class="movie-result-img" src="${datafullList[i].fanart}" alt="">
                <div class="movie-result-info">
                    <span class="movie-result-item-title"> ${datafullList[i].title} </span>
                    <p class="movie-list-item-desc">${datafullList[i].year}
                    </p>
                    <button class="movie-result-item-button">Watch</button>
                </div>`;
                    dataListresult.push(datafullList[i])
                    const movie_id = document.getElementsByClassName('movie-result-item-button');
                    for (let k = 0; k < dataListresult.length; k++) {
                        movie_id[k].id = dataListresult[k].imdb_id;
                        movie_id[k].onclick = changeLandingPage;
                    }

                }
            }
            if (dataListresult.length == 0) {
                document.getElementById("movie_results").innerHTML += `<h3 class="list-message"> We cannot find any results </h3>`;
            }
        })
        .catch(err => {
            console.error(err);
        });
}

