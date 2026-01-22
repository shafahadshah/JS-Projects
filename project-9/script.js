// Select elements
const colorInput = document.getElementById('colorInput');
const addColorBtn = document.getElementById('addColorBtn');
const palette = document.getElementById('palette');
const clearPaletteBtn = document.getElementById('clearPaletteBtn');

// Array to store palette colors
let colors = [];

// Add color to palette
addColorBtn.addEventListener('click', () => {
  const color = colorInput.value;
  if (!colors.includes(color)) {
    colors.push(color);
    renderPalette();
  }
});

// Clear palette
clearPaletteBtn.addEventListener('click', () => {
  colors = [];
  renderPalette();
});

// Render palette
function renderPalette() {
  palette.innerHTML = '';
  colors.forEach(color => {
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color;
    div.innerHTML = `<span>${color.toUpperCase()}</span>`;
    div.addEventListener('click', () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    });
    palette.appendChild(div);
  });
}

// Optional: generate random color palette on load
for (let i = 0; i < 3; i++) {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
  colors.push(randomColor);
}
renderPalette();
