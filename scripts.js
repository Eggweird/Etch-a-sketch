let currentGrid = 16;
let currentMode = "color";
let currentColor = "#000000";

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setMode(newMode) {
  activeButton(newMode);
  currentMode = newMode;
}

function setGridSize(newSize) {
  currentGrid = newSize;
}
const grid = document.querySelector(".grid-container");
const colorChooser = document.querySelector("#color-chooser");
const clearButton = document.querySelector("#clear-button");
const slider = document.querySelector(".slider");
const sliderVal = document.querySelector(".slider-value");
const rgbButton = document.querySelector("#rgb-button");
const colorButton = document.querySelector("#color-button");
const eraserButton = document.querySelector("#eraser-button");

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

slider.addEventListener("mousemove", function (input) {
  updateSliderText(input.target.value);
});

slider.addEventListener("change", function (input) {
  sizeChange(input.target.value);
});

clearButton.addEventListener("click", () => {
  refreshPage();
});

//This chunk of code is created to give mouseDown a boolean value
//This will be used later for addeventlistener
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function updateSliderText(value) {
  sliderVal.innerHTML = `${value} x ${value}`;
}

function sizeChange(value) {
  setGridSize(value);
  updateSliderText(value);
  refreshPage();
}

function clearGrid() {
  grid.innerHTML = "";
}

function refreshPage() {
  clearGrid();
  createGrid(currentGrid);
}

function createGrid(value) {
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

  for (let i = 0; i < value * value; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("cell");
    gridDiv.addEventListener("mouseover", changeColor);
    gridDiv.addEventListener("mousedown", changeColor);
    grid.appendChild(gridDiv);
  }
}

function changeColor(input) {
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

createGrid(16);
activeButton("color");
