"use strict";

const grid = document.querySelector('.grid');
const toggleGridLinesBtn = document.querySelector('.btn-toggle-grid-lines');
const clearBtn = document.querySelector('.btn-clear');

const uiState = {
  activeBrush: false,
  count: 16,
  gridSize: 640,
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
  const { gridSize } = uiState;
  const cellSize = Math.floor(gridSize / count);
  document.documentElement.style.setProperty("--cell", cellSize + "px");
  [...new Array(count ** 2)].forEach(() => {
    const newCell = createCell();
    grid.appendChild(newCell);
  })
};

const startApp = () => {
  renderGrid(count);
  const allCells = document.querySelectorAll('.cell');
  toggleGridLinesBtn.addEventListener('click', () => {
    allCells.forEach((cell) => {
      cell.classList.toggle('border-active');
    });
  });

  clearBtn.addEventListener('click', () => {
    allCells.forEach((cell) => {
      cell.style.backgroundColor = "#ffffff";
    });
  });

  const listener = ({target}) => {
    if (target.classList.contains('cell')) {
      target.style.backgroundColor = "#000000";
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
