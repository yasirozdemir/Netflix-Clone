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

window.onload = () => {
  addOverlays();
};
