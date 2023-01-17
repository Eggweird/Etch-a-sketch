//This chunk of code is created to give mouseDown a boolean value
//This will be used later for addeventlistener
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//removes child node, in this case iniitial grid 16x16
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const grid = document.querySelector(".grid-container");
//Initial grid creation of 16x16 when first time opening
function createGrid(val) {
  for (let i = 0; i < val * val; i++) {
    draw();
  }
}

const clearButton = document.querySelector("#clear-button");
//Button event that will clear the entire grid
clearButton.addEventListener("click", () => {
  let cells = grid.children;
  let val = document.getElementById("sliderId").value;
  for (let i = 0; i < val * val; i++) {
    cells[i].style.backgroundColor = "white";
  }
});

//Draw function that will allow user to draw via mouse down and mouse over
function draw() {
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

const slider = document.querySelector(".slider");
const sliderVal = document.querySelector(".slider-value");

//Slider that will populate the grid with its value chosen val x val
slider.addEventListener("input", function () {
  //have to use element by ID to get value . element by class name gives an
  //array so can not get value
  let val = document.getElementById("sliderId").value;
  sliderVal.innerHTML = `${val} x ${val}`;
  removeAllChildNodes(grid);
  grid.style.gridTemplateRows = `repeat(${val}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
  createGrid(val);
});

//Initial grid creation 16x16
createGrid(16);
