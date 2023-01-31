//default values here
let currentGrid = 16;
let currentMode = "color";
let currentColor = "#000000";
let currentGridToggle = "16x16";

//set currentColor to new chosen color
function setCurrentColor(newColor) {
  currentColor = newColor;
}

//set active button toggle to new mode and current mode to new mode
function setMode(newMode) {
  activeButton(newMode);
  currentMode = newMode;
}

//set active grid button toggle to active
function setGridToggle(newGridToggle) {
  activeGrid(newGridToggle);
  currentGridToggle = newGridToggle;
}

//set currentGrid to newSize
function setGridSize(newSize) {
  currentGrid = newSize;
}

//creation of constants based on its id/class utilizing queryselector
const grid = document.querySelector(".grid-container");
const colorChooser = document.querySelector("#color-chooser");
const clearButton = document.querySelector("#clear-button");
//var slider = document.querySelector(".slider");
//var sliderVal = document.querySelector(".slider-value");
const rgbButton = document.querySelector("#rgb-button");
const colorButton = document.querySelector("#color-button");
const eraserButton = document.querySelector("#eraser-button");
const button16 = document.querySelector("#button16");
const button32 = document.querySelector("#button32");
const button64 = document.querySelector("#button64");

//lines 33-59 will give each button an addeventlistener
//and function based on needs of what button should do
colorChooser.addEventListener("input", function (input) {
  setCurrentColor(input.target.value);
});

colorButton.addEventListener("click", () => {
  setMode("color");
});

rgbButton.addEventListener("click", () => {
  setMode("rgb");
});

eraserButton.addEventListener("click", () => {
  setMode("eraser");
});

clearButton.addEventListener("click", () => {
  refreshPage();
});

button16.addEventListener("click", () => {
  sizeChange(16);
  setGridToggle("16x16");
});
button32.addEventListener("click", () => {
  sizeChange(32);
  setGridToggle("32x32");
});
button64.addEventListener("click", () => {
  sizeChange(64);
  setGridToggle("64x64");
});

//This chunk of code is created to give mouseDown a boolean value
//This will be used for addeventlistener
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//this will update gridsize, slidertext, and will clear the grid
function sizeChange(value) {
  setGridSize(value);
  //updateSliderText(value);
  refreshPage();
}

//This will delete the columns/rows div within grid to nothing
function clearGrid() {
  grid.innerHTML = "";
}

//Utilize clearGrid that will make the grid empty then create grid again with value of current grid
function refreshPage() {
  clearGrid();
  createGrid(currentGrid);
}

//Take the value and create rows and columns based on value,
//utilizing for loops to create div based on value*value and class
//as well for each div called cell. Then allow each cell to be able
//to change color based off of mouseover/mousedown, appending to add
//everything into the grid div
function createGrid(value) {
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

  for (let i = 0; i < value * value; i++) {
    let gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");
    gridDiv.addEventListener("mouseover", changeColor);
    gridDiv.addEventListener("mousedown", changeColor);
    grid.appendChild(gridDiv);
  }
}

//Based on the input if rgb it will create random rgb values per cell
//if color it will fill each cell with color chosen from rgb color plate
//if eraser it will fill each cell with white
function changeColor(input) {
  //this if statement is to not have mouse hover constantly color the cells
  //it will need to have a mousedown as well. In this case if input type
  //is moueover and not mousedown instead of coloring the cell it will
  //just return
  if (input.type === "mouseover" && !mouseDown) {
    return;
  }
  if (currentMode === "rgb") {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var RGBColor = `rgb(${r}, ${g}, ${b})`;
    input.target.style.backgroundColor = RGBColor;
  } else if (currentMode === "color") {
    input.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    input.target.style.backgroundColor = "#FFFFFF";
  }
}

//adds a classlist of active to showcase which button is active with use of CSS
//active is what will be given to the class of each button or removed
function activeButton(mode) {
  if (currentMode === "rgb") {
    rgbButton.classList.remove("active");
  } else if (currentMode === "color") {
    colorButton.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserButton.classList.remove("active");
  }

  if (mode === "rgb") {
    rgbButton.classList.add("active");
  } else if (mode === "color") {
    colorButton.classList.add("active");
  } else if (mode === "eraser") {
    eraserButton.classList.add("active");
  }
}

//Function will give toggle color to button that is
//active for which size grid is chosen.
function activeGrid(gridDescription) {
  if (currentGridToggle === "16x16") {
    button16.classList.remove("active");
  } else if (currentGridToggle === "32x32") {
    button32.classList.remove("active");
  } else if (currentGridToggle === "64x64") {
    button64.classList.remove("active");
  }

  if (gridDescription === "16x16") {
    button16.classList.add("active");
  } else if (gridDescription === "32x32") {
    button32.classList.add("active");
  } else if (gridDescription === "64x64") {
    button64.classList.add("active");
  }
}

//initial load of site will set createGrid and activeButton with default value above
createGrid(currentGrid);
activeButton(currentMode);
activeGrid(currentGridToggle);
