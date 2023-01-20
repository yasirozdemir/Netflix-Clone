function addOverlays() {
  let moviesNode = document.querySelectorAll(".carousel-item .col");

  for (movie of moviesNode) {
    let overlay = document.createElement("div");
    overlay.className =
      "overlay invisible position-absolute d-flex justify-content-start align-items-start bg-black p-2 rounded-bottom";
    overlay.innerHTML = `<button type="button" class="btn btn-light rounded-circle">
                            <i class="bi bi-play-fill"></i>
                        </button>
                        <button type="button" class="btn btn-outline-light rounded-circle ml-1">
                            <i class="bi bi-plus"></i>
                        </button>
                        <button type="button" class="btn btn-outline-light rounded-circle ml-1">
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                        <button type="button" class="btn btn-outline-light rounded-circle ml-auto">
                            <i class="bi bi-chevron-down"></i>
                            </button>`;
    movie.appendChild(overlay);
  }
}

const url = "https://striveschool-api.herokuapp.com/api/movies";

const optionsToGet = {
  // method: "GET" <- not needed because it's the default one of .fetch()
  headers: new Headers({
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
  }),
};

let allMovies = []; // temp memory of movies jus in case of a need

const getMovies = async () => {
  const response = await fetch(url, optionsToGet);
  const movieData = await response.json();
  console.log(movieData);
  movieData.forEach((movie) => {
    allMovies.push(movie);
  });
  console.log(allMovies);
};

window.onload = () => {
  addOverlays();
  getMovies();
};
