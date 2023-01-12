//This chunk of code is created to give mouseDown a boolean value
//This will be used later for addeventlistener
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const grid = document.querySelector(".grid-container");
//current function allows the grid to be 16x16
function createGrid() {
  //this for loop goes through 256 since 16x16 is256
  //allowing to create small squares that will fill out
  //the empty spaces and when mouseover event is done
  //the squares itself will shade in black
  for (let i = 0; i < 256; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");

    //this chunk of code makes the event listener become
    //sort of like a click and hold function
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
const clearButton = document.querySelector("#clear-button");
//This event listener will once clicked traverse through the entire
//16x16 grid and will color each cells to white, basically clearing
//the current sketch
clearButton.addEventListener("click", () => {
  let cells = grid.children;
  let val = document.getElementById("sliderId").value;
  //for loop will traverse entire 16x16 grid. it will then
  //get the grid.children for cells. Having each cell
  //be iterated through and coloring it white
  for (let i = 0; i < val * val; i++) {
    cells[i].style.backgroundColor = "white";
  }
});

const slider = document.querySelector(".slider");
const sliderVal = document.querySelector(".slider-value");

slider.addEventListener("input", function () {
  //have to use element by ID to get value . element by class name gives an
  //array so can not get value
  let val = document.getElementById("sliderId").value;
  console.log(val);
  sliderVal.innerHTML = `${val} x ${val}`;
  removeAllChildNodes(grid);
  grid.style.gridTemplateRows = `repeat(${val}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
  for (let i = 0; i < val * val; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");

    //this chunk of code makes the event listener become
    //sort of like a click and hold function
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
});
createGrid();
