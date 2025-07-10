const gridContainer = document.getElementById('grid-container');
const resetBtn = document.getElementById('reset-btn');
const clearBtn = document.getElementById('clear-btn');
const colorMode = document.getElementById('color-mode');
const darkenToggle = document.getElementById('darken-toggle');

// initialize default grid
createGrid(16);

// grid size change
resetBtn.addEventListener('click', () => {
  const size = parseInt(prompt('Enter new grid size (1–100):'));

  if (!size || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }

  createGrid(size);
});

// clear button
clearBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.style.removeProperty('background-color');
    square.style.removeProperty('opacity');
    square.dataset.opacity = 0;
  });
});


// create grid
function createGrid(size) {
  gridContainer.innerHTML = '';
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.opacity = 0;

    square.addEventListener('mouseover', () => {
      applyColorEffect(square);
    });

    gridContainer.appendChild(square);
  }
}

// handle hover effect with or without darkening
function applyColorEffect(square) {
    if (colorMode.value === 'eraser') {
    square.style.removeProperty('background-color');
    square.style.removeProperty('opacity');
    square.dataset.opacity = 0;
    return;
  }

  const selectedColor = colorMode.value;
  const darkening = darkenToggle.checked;

  let opacity = parseFloat(square.dataset.opacity);

  if (darkening && opacity < 1) {
    opacity += 0.1;
    square.dataset.opacity = opacity.toFixed(1);
  } else if (!darkening) {
    opacity = 1;
  }

  if (selectedColor === 'random') {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    square.style.backgroundColor = selectedColor;
    square.style.opacity = opacity;
  }
}