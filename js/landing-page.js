let arrow = document.querySelectorAll(".arrow-slide");
let suggestionList = document.querySelectorAll(".suggestion_list");
let leftArrow = `<i class="fas fa-chevron-circle-left slide-arrow"></i>`;
let rightArrow = `<i class="fas fa-chevron-circle-right slide-arrow"></i>`;
let movieAPI = "../db.json";

let movieTitle;
let reviewId;

function info(n) {
  const proxyUrl = "https://free-proxy.fly.dev/";
  const targetUrl = `http://www.omdbapi.com/?i=${n}&apikey=48b12622`;
  fetch(proxyUrl + targetUrl, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("title").innerText = data.Title;
      document.getElementById("plot").innerText = data.Plot;
      movieTitle = data.Title;
      reviewId = data.imdbID;
    })
    .catch((err) => {
      alert("Lỗi ở info (n)");
    });
}

function changeBackground(n) {
  const proxyUrl = "https://free-proxy.fly.dev/";
  const targetUrl = `http://www.omdbapi.com/?i=${n}&apikey=48b12622`;
  fetch(proxyUrl + targetUrl, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("bg").src = data.Poster;
    })
    .catch((err) => {
      console.log(err);
      alert("Lỗi ở changeBackground(n)");
    });
}

function changeTrendList(n, m) {
  fetch(movieAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data = data.movie_results;
      let container = document.getElementById(`trendingContainer${n}`);
      for (i = 0; i < data[m].length; i++) {
        if (n == 1) {
          container.innerHTML += `<div onClick="changeInfo(event.srcElement.id)" class="sug-item p-2">
                                            <img id="${data[m][i].imdb_id}" src="${data[m][i].poster}"
                                                class="sug-img" alt="">
                                        </div>`;
        } else {
          if (data[m][i].fanart !== "") {
            container.innerHTML += `<div class="sug-item p-2">
                                            <img src="${data[m][i].fanart}"
                                                class="sug-img" alt="">
                                            <div onClick="changeInfo(event.srcElement.id)" id="${data[m][i].imdb_id}" class="image-overlay">
                                                <h4 onclick="event.stopPropagation()" class="image-title">${data[m][i].title}</h4>
                                                <div onclick="event.stopPropagation()" class="image-plot">${data[m][i].year}</div>
                                            </div>
                                        </div>`;
          }
        }
      }
    })
    .then(() => {
      $(`#trendingContainer${n}`).slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        nextArrow: `${rightArrow}`,
        prevArrow: `${leftArrow}`,
        variableWidth: true,
      });
    })
    .catch((err) => {
      alert("Sai ở changeTrendList()");
    });
}

function changeInfo(movieId) {
  info(movieId);
  changeBackground(movieId);
  $("html, body").animate({ scrollTop: 0 }, "slow");
  localStorage.setItem("movieId", movieId);
}

window.onload = function () {
  console.log("Da vao landing page");
  tempId = localStorage.getItem("movieId");
  info(tempId);
  changeBackground(tempId);
  localStorage.setItem("movieId", tempId);
};

function convertToSearchString(title) {
  // Trim the title, replace spaces with '+', and append 'trailer'
  return title.trim().replace(/\s+/g, "+") + "+trailer";
}

function trailer() {
  const searchString = convertToSearchString(movieTitle);
  window.open(`https://www.youtube.com/results?search_query=${searchString}`);
}
function review() {
  window.open(`https://www.imdb.com/title/${reviewId}`);
}
changeTrendList(1, 0);
changeTrendList(2, 1);
changeTrendList(3, 2);
changeTrendList(4, 3);
