let addCart = document.querySelector('.btn-cart');

addCart.addEventListener('click', () => {
    let moviesInCart = localStorage.getItem('moviesInCart');
    let currentId = localStorage.getItem('movieId');
    const getLognin = document.getElementById("nameUser");
    if (getLognin.innerText == 'Log in') {
        alert('You must log in to add')
    } else {
        if (moviesInCart) {

            let tempArray = localStorage.getItem('moviesInCart');
            tempArray = JSON.parse(tempArray);
            if (tempArray.includes(currentId)) {
                alert('This movie has already been added');
            }
            else {
                tempArray.push(currentId);
                alert(`Movie ID ${currentId} added to your favourite`)
                localStorage.setItem('moviesInCart', JSON.stringify(tempArray));
                cartCount();
            }
    
        } else {
            let movieArray = [];
            movieArray.push(currentId);
            alert(`Movie ID ${currentId} added to your favourite`)
            localStorage.setItem('moviesInCart', JSON.stringify(movieArray));
            cartCount();
        }
    }
    
})

function countMovieNumbers() {
    let movieNumbers = localStorage.getItem('movieNumbers');
    if (movieNumbers) {
        document.querySelector('.cart span').textContent = movieNumbers;
    }
}

function cartCount() {
    let movieNumbers = localStorage.getItem('movieNumbers');

    movieNumbers = parseInt(movieNumbers);

    if (movieNumbers) {
        localStorage.setItem('movieNumbers', movieNumbers + 1);
        document.querySelector('.cart span').textContent = movieNumbers + 1;
    } else {
        localStorage.setItem('movieNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

}
countMovieNumbers();
































