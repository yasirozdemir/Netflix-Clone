const url = "https://striveschool-api.herokuapp.com/api/movies";

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");

const optionsToPut = {
  method: "POST",
  body: JSON.stringify(),
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
  }),
};

const optionsToDelete = {
  method: "DELETE",
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzgxYWU3MzczODAwMTUzNzQzN2MiLCJpYXQiOjE2NzQyMDQ0MjUsImV4cCI6MTY3NTQxNDAyNX0.AEa3A6zDgOYkw4EmzWMh3aKhpz1vxOYOhft6_lbropo",
  }),
};

function trial(event) {
  console.log(event.target.id === "publishGenreButton");
}

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
      //   getMovies();
    } else {
      console.error("Publishing movie error");
    }
  } catch (error) {}
};
