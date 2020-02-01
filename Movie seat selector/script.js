seats = document.querySelectorAll(".row .seat:not(.occupied)");
seatsNumber = document.getElementById("seatsNumber");
price = document.getElementById("price");
movie = document.getElementById("movie");
container = document.querySelector(".container");
let ticketPrice = +movie.value;

populateUi();
// if the targeted element has the class of seat but does not have the
// class of occupied then we toggle the selected class
container.addEventListener("click", e => {
  e.preventDefault;
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

// updates the values of the numbers shown bellow
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatInedxes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("seatIndexes", JSON.stringify(seatInedxes));
  const selectedNumber = selectedSeats.length;

  seatsNumber.innerText = selectedNumber;
  price.innerText = selectedNumber * ticketPrice;
}

// changing the value of the local ticket price value
movie.addEventListener("change", e => {
  ticketPrice = movie.value;
  setMovieData(e.target.value, e.target.selectedIndex);
  updateSelectedCount();
});

// storing to local data the the selected movie(index) and value(price)
function setMovieData(price, movie) {
  localStorage.setItem("moviePrice", price);
  localStorage.setItem("movieName", movie);
}

/*
checking if the retrived indexes exist and then
checking in the array of seats for each seat if it's index
appears in the array of the selected seats from local storrage
*/
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatIndexes"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("movieName");

  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
    ticketPrice = +movie.value;
  }
}
// initial count and total set
updateSelectedCount();
