console.log("hello");
const grid = document.querySelector(".grid-container");

function createGrid() {
  for (let i = 0; i < 256; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");

    grid.appendChild(gridDiv);
  }
}

createGrid();
