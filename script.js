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

const genresArray = [];
const getGenres = async () => {
  try {
    const response = await fetch(url, optionsToGet);
    const genres = await response.json();
    genres.forEach((genre) => {
      genresArray.push(genre);
      getMovies(genre);
    });
  } catch (error) {
    console.error(error);
  }
};

const getMovies = async (genre) => {
  try {
    const response = await fetch(url + "/" + genre, optionsToGet);
    const movieData = await response.json();
    displayMovies(movieData, genre);
  } catch (error) {
    console.error(error);
  }
};

const horrorMoviesContainer = document.querySelector(
  "#horrorMoviesContainer > .row"
);
const romanticContainer = document.querySelector(
  "#romanticMoviesContainer > .row"
);
const documentariesContainer = document.querySelector(
  "#documentariesContainer > .row"
);
const allMoviesContainer = document.querySelector("#allMoviesContainer");

const urlParams = new URLSearchParams(location.search);
const ID = urlParams.get("id");
console.log(ID);

const displayMovies = (moviesArray, genre) => {
  let spaceForMovies = null;
  switch (genre) {
    case "horror":
      spaceForMovies = horrorMoviesContainer;
      break;
    case "romantic":
      spaceForMovies = romanticContainer;
      break;
    case "documentary":
      spaceForMovies = documentariesContainer;
      break;
  }

  switch (ID) {
    case null:
      horrorMoviesContainer.remove();
      romanticContainer.remove();
      documentariesContainer.remove();
      break;
    case "horror":
      allMoviesContainer.remove();
      romanticContainer.remove();
      documentariesContainer.remove();
      break;
    case "romantic":
      allMoviesContainer.remove();
      horrorMoviesContainer.remove();
      documentariesContainer.remove();
      break;
    case "documentary":
      allMoviesContainer.remove();
      horrorMoviesContainer.remove();
      romanticContainer.remove();
      break;
  }

  if (spaceForMovies !== null) {
    moviesHTML = moviesArray
      .map(({ name, description, imageUrl }) => {
        return `<div class="movie-card card col-sm-6 col-md-4 col-lg-3 col-xl-2 mx-2 my-2" style="width: 18rem;">
                  <img src="${imageUrl}" class="card-img-top">
                  <div class="card-body">
                    <p class="card-title">${name}</p>
                    <p class="card-text">${description}</p>
                  </div>
                </div>`;
      })
      .join("");
    spaceForMovies.innerHTML = moviesHTML;
  }
};

window.onload = async () => {
  getGenres();
  addOverlays();
};
