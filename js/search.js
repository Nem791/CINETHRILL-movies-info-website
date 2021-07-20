// FETCH API FOR SEACRH
let changeLandingPage = function () {
    localStorage.setItem('movieId', this.id);
    window.location.replace('landing-page.html');
}

function changetoSearch() {
    window.location.replace('search.html');
}

function searchFilm() {
    // window.location.replace('search.html');
    let x = document.getElementById("search-data").value;
    console.log(x)
    // window.location.replace('search.html');
    document.getElementById("movie_results").innerHTML = ""
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
            console.log(dataListresult)
            for (let i = 0; i < datafullList.length; i++) {
                if (datafullList[i].title.includes(x) || datafullList[i].title.split("").includes(x)) {
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
                document.getElementById("movie_results").innerHTML += `<h3> We cannot find any results </h3>`;
            }
        })
        .catch(err => {
            console.error(err);
        });
}

