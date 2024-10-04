const containerVideos = document.querySelector(".videos__container");

const linkApi = "http://localhost:3000/videos";

// Search and display API data
async function buscarEMostrarVideos() {
  try {
    const searchVideos = await fetch(linkApi);
    const videos = await searchVideos.json();
    videos.forEach((video) => {
      containerVideos.innerHTML += `
      <li class="videos__item">
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
        <div class="descricao-video">
          <img class="img-canal" src="${video.imagem}" alt="Logo do canal"/>
          <h3 class="titulo-video">${video.titulo}</h3>
          <p class="titulo-canal">${video.descricao}</p>
          <p class="categoria" hidden>${video.categoria}</p>
        </div>
      </li>
      `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();

// Search bar
const searchBar = document.querySelector(".pesquisar__input");

searchBar.addEventListener("input", filterSearch);

function filterSearch() {
  const videos = document.querySelectorAll(".videos__item");

  if (searchBar.value != "") {
    for (let video of videos) {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let filterValue = searchBar.value.toLowerCase();

      if (!titulo.includes(filterValue)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    video.style.display = "block";
  }
}

// Category buttons
const categoryButton = document.querySelectorAll(".superior__item");

categoryButton.forEach((button) => {
  let categoryName = button.getAttribute("name");
  button.addEventListener("click", () => filterByCategory(categoryName));
});

function filterByCategory(filter) {
  const videos = document.querySelectorAll(".videos__item");
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let filterValue = filter.toLowerCase();

    if (!categoria.includes(filterValue) && filterValue != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}
