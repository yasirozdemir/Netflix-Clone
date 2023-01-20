const url = "https://striveschool-api.herokuapp.com/api/movies/";

const urlParams = new URLSearchParams(location.search);
const ID = urlParams.get("id");
const allMoviesContainer = document.querySelector("#allMoviesContainer");

window.onload = async () => {
  try {
    getGenres();
    if (ID !== null) {
      // editing
      const publishButton = document.querySelector("#publishButton");
      publishButton.remove();
      allMoviesContainer.classList.add("d-none");
    } else {
      // publishing a new one

      const editButton = document.querySelector("#editButton");
      editButton.remove();
      const backButton = document.querySelector("#backButton");
      backButton.remove();
    }
  } catch (error) {
    console.error(error);
  }
};

// options-------------------------------------------------------
const optionsToDelete = {
  method: "DELETE",
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
  }),
};

const optionsToGet = {
  // method: "GET" <- not needed because it's the default one of .fetch()
  headers: new Headers({
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
  }),
};

// fetch functions-------------------------------------------------------
const publish = async (publishEvent) => {
  try {
    publishEvent.preventDefault();
    const newMovie = {
      name: document.querySelector("#movieName").value,
      description: document.querySelector("#movieDescription").value,
      category: document.querySelector("#movieGenre").value.toLowerCase(),
      imageUrl: document.querySelector("#movieImageUrl").value,
    };

    const optionsToPost = {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
      }),
    };

    const response = await fetch(url, optionsToPost);

    if (response.ok) {
      console.log("Publishing movie successful");
      document.querySelector("#movieName").value = "";
      document.querySelector("#movieDescription").value = "";
      document.querySelector("#movieGenre").value = "";
      document.querySelector("#movieImageUrl").value = "";
      location.reload();
    } else {
      console.error("Publishing movie error");
    }
  } catch (error) {}
};

const deleteMovie = async (id) => {
  try {
    const response = fetch(`${url}/${id}`, optionsToDelete).then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const edit = async (editEvent) => {
  try {
    editEvent.preventDefault();
    const editedMovie = {
      name: document.querySelector("#movieName").value,
      description: document.querySelector("#movieDescription").value,
      category: document.querySelector("#movieGenre").value.toLowerCase(),
      imageUrl: document.querySelector("#movieImageUrl").value,
    };

    const optionsToPut = {
      method: "PUT",
      body: JSON.stringify(editedMovie),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
      }),
    };

    const response = await fetch(`${url}${ID}`, optionsToPut);

    if (response.ok) {
      console.log("Editing Successful");
      document.querySelector("#movieName").value = "";
      document.querySelector("#movieDescription").value = "";
      document.querySelector("#movieGenre").value = "";
      document.querySelector("#movieImageUrl").value = "";
      window.open("./backoffice.html");
    } else {
      console.error("Editing error");
    }
  } catch (error) {
    console.error("Editing error");
  }
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

const moviesArray = [];
const getMovies = async (genre) => {
  try {
    const response = await fetch(url + "/" + genre, optionsToGet);
    const movieData = await response.json();
    movieData.forEach((movie) => {
      moviesArray.push(movie);
    });
    displayMoviesOnAdminPanel(movieData, genre);
  } catch (error) {
    console.error(error);
  }
};

const displayMoviesOnAdminPanel = (moviesArray, genre) => {
  const check = document.querySelector(`#${genre}Container`);
  if (check === null) {
    const tableContainer = document.createElement("div");
    tableContainer.className = "container";
    tableContainer.id = `${genre}Container`;
    tableContainer.innerHTML = "";
    tableContainer.innerHTML = `
        <h4>${genre.toUpperCase()}:</h4>
        <div class="row">
          <div class="col">
            <table class="table table-hover table-dark">
              <thead>
                <th scope="col">Movie Preview</th>
                <th scope="col">Name</th>
                <th scope="col">ID</th>
                <th scope="col">Buttons</th>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
  `;
    allMoviesContainer.appendChild(tableContainer);

    const tableBody = document.querySelector(`#${genre}Container tbody`);

    const moviesHTML = moviesArray
      .map(({ name, imageUrl, _id }) => {
        return `<tr>
                    <td style="vertical-align: middle"><img src="${imageUrl}" style="object-fit: contain; width:45px; height: 45px"></td>
                    <td style="vertical-align: middle">${name}</td>
                    <td style="vertical-align: middle">${_id}</td>
                    <td style="vertical-align: middle"><div class="btn-group mx-auto">
                        <a
                        href='./backoffice.html?id=${_id}'
                        type="button"
                        class="btn btn-sm btn-info"
                        >
                        <i class="bi bi-pen"></i>
                        </a>
                        <button
                        type="button"
                        class="btn btn-sm btn-danger" onclick="deleteMovie('${_id}')"
                        >
                        <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                    </td>
                </tr>`;
      })
      .join("");

    tableBody.innerHTML = moviesHTML;
  }
};
