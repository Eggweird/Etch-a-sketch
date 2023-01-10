const grid = document.querySelector(".grid-container");
const clearButton = document.querySelector("#clear-button");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//current function allows the grid to be 16x16
function createGrid() {
  //this for loop goes through 256 since 16x16 is256
  //allowing to create small squares that will fill out
  //the empty spaces and when mouseover event is done
  //the squares itself will shade in black
  for (let i = 0; i < 256; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");
    gridDiv.addEventListener("mouseover", function (e) {
      if (e.type === "mouseover" && !mouseDown) return;
      e.target.style.backgroundColor = "black";
    });
    gridDiv.addEventListener("mousedown", function (e) {
      if (e.type === "mouseover" && !mouseDown) return;
      e.target.style.backgroundColor = "black";
    });
    grid.appendChild(gridDiv);
  }
}
//This event listener will once clicked traverse through the entire
//16x16 grid and will color each cells to white, basically clearing
//the current sketch
clearButton.addEventListener("click", () => {
  //for loop will traverse entire 16x16 grid. it will then
  //get the grid.children for cells. Having each cell
  //be iterated through and coloring it white
  for (let i = 0; i < 256; i++) {
    let cells = grid.children;
    cells[i].style.backgroundColor = "white";
  }
});
createGrid();
