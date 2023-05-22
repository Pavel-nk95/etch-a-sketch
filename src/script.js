"use strict";

const grid = document.querySelector('.grid');
const toggleGridLinesBtn = document.querySelector('#btn-toggle-grid-lines');
const blackBtn = document.querySelector('#btn-black');
const eraserBtn = document.querySelector('#btn-eraser');
const clearBtn = document.querySelector('#btn-clear');
const selectColorBtn = document.querySelector('#select-color');
const rainbowBtn = document.querySelector('#btn-rainbow');
const range = document.querySelector('#range');

const colors = {
  black: '#000000',
  white: '#ffffff'
};

const uiState = {
  rainbowMode: false,
  activeBrush: false,
  count: 16,
  gridSize: 640,
  colorBrush: colors.black,
};

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
  const allCells = document.querySelectorAll('.cell');

  toggleGridLinesBtn.addEventListener('click', () => {
    const allNewCells = document.querySelectorAll('.cell');
    allNewCells.forEach((cell) => {
      cell.classList.toggle('border-active');
    });
  });

  clearBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    allCells.forEach((cell) => {
      cell.style.backgroundColor = colors.white;
    });
  });

  eraserBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    uiState.colorBrush = colors.white;
  });

  blackBtn.addEventListener('click', () => {
    uiState.rainbowMode = false;
    uiState.colorBrush = colors.black;
  });

  rainbowBtn.addEventListener('click', () => {
    const { rainbowMode } = uiState;
    uiState.rainbowMode = !rainbowMode;
  });

  range.addEventListener('change', ({ target }) => {
    const { value } = target;
    console.log(+value);
    renderGrid(+value);
  });

  selectColorBtn.addEventListener('change', ({ target }) => {
      uiState.rainbowMode = false;
      const { value } = target;
      uiState.colorBrush = value;
  });

  const listener = ({target}) => {
    const { rainbowMode } = uiState;
    if (target.classList.contains('cell')) {
      target.style.backgroundColor = rainbowMode ? getRandomColor() : uiState.colorBrush;
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

// allCells.forEach((cell) => {
//   cell.addEventListener('mouseover', ({target}) => {
//     console.log(target);
//     target.style.backgroundColor = "#000000";
//   });
// });
