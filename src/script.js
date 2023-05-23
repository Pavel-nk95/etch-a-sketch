"use strict";

const grid = document.querySelector('.grid');
const toggleGridLinesBtn = document.querySelector('#btn-toggle-grid-lines');
const blackBtn = document.querySelector('#btn-black');
const eraserBtn = document.querySelector('#btn-eraser');
const clearBtn = document.querySelector('#btn-clear');
const selectColorBtn = document.querySelector('#select-color');
const rainbowBtn = document.querySelector('#btn-rainbow');
const grayScaleBtn = document.querySelector('#btn-gray-scale');
const range = document.querySelector('#range');

const colors = {
  black: '#000000',
  white: '#ffffff'
};

const uiState = {
  rainbowMode: false,
  grayScaleMode: false,
  activeBrush: false,
  count: 16,
  gridSize: 640,
  colorBrush: colors.black,
};

const getNewGrayScaleColor = (rgbColor) => {
  let sep = rgbColor.indexOf(",") > -1 ? "," : " ";
  const [r, g, b] = rgbColor.substr(4).split(")")[0].split(sep);
  console.log(r, g ,b)
  if ((+r - 25) <= 0 || (+g - 25) <= 0 || (+b - 25) <= 0) {
    return rgbColor;
  }
  return `rgb(${(+r - 25)}, ${(+g - 25)}, ${(+b - 25)})`;
}

const getRandomColor = () => {
  return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
}

const createCell = () => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.classList.add('border-active');
  cell.setAttribute("name", "cell");
  return cell;
};

const renderGrid = (count) => {
  grid.replaceChildren();
  const { gridSize } = uiState;
  const cellSize = Math.floor(gridSize / count);
  document.documentElement.style.setProperty("--cell", cellSize + "px");
  [...new Array(count ** 2)].forEach(() => {
    const newCell = createCell();
    grid.appendChild(newCell);
  })
};

const startApp = () => {
  renderGrid(uiState.count);
  range.setAttribute("value", "8");

  toggleGridLinesBtn.addEventListener('click', () => {
    const allNewCells = document.querySelectorAll('.cell');
    allNewCells.forEach((cell) => {
      cell.classList.toggle('border-active');
    });
  });

  clearBtn.addEventListener('click', () => {
    const allNewCells = document.querySelectorAll('.cell');
    uiState.rainbowMode = false;
    uiState.grayScaleMode = false;
    allCells.forEach((cell) => {
      cell.style.backgroundColor = colors.white;
    });
  });

  eraserBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    uiState.grayScaleMode = false;
    uiState.colorBrush = colors.white;
  });

  grayScaleBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    const { grayScaleMode } = uiState;
    uiState.grayScaleMode = !grayScaleMode;
  });

  blackBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    uiState.grayScaleMode = false;
    uiState.colorBrush = colors.black;
  });

  rainbowBtn.addEventListener('click', () => {
    uiState.grayScaleMode = false;
    const { rainbowMode } = uiState;
    uiState.rainbowMode = !rainbowMode;
  });

  range.addEventListener('change', ({ target }) => {
    const { value } = target;
    renderGrid(+value);
  });

  selectColorBtn.addEventListener('change', ({ target }) => {
      uiState.rainbowMode = false;
      const { value } = target;
      uiState.colorBrush = value;
  });

  const listener = ({target}) => {
    const { rainbowMode, grayScaleMode } = uiState;
    if (target.classList.contains('cell')) {
      if (rainbowMode) {
        target.style.filter = 'none';
        target.style.backgroundColor = getRandomColor();
      } else if (grayScaleMode) {
        const currentColor = getComputedStyle(target).backgroundColor;
        const newGrayScaleColor = getNewGrayScaleColor(currentColor);
        target.style.backgroundColor = newGrayScaleColor;
      } else {
        target.style.filter = 'none';
        target.style.backgroundColor = uiState.colorBrush;
      }
    }
  };

  grid.addEventListener('click', () => {
    const { activeBrush } = uiState;
    uiState.activeBrush = !activeBrush;
    if (uiState.activeBrush) {
      this.addEventListener('mouseover', listener, false);
    } else {
      this.removeEventListener('mouseover', listener, false);
    }
  });

};

startApp();
