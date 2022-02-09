const canvas = document.getElementById('jsCanvas');
// get canvas' 2D rendering context
// context to manipulate pixels inside canvas
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');

// to give size to the pixel manipulation
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(e) {
	// offset from canvas
	const x = e.offsetX;
	const y = e.offsetY;

	if (!painting) {
		// creates path as mouse moves
		ctx.beginPath();
		// moves path to x, y position of the mouse
		// starting point of line
		ctx.moveTo(x, y);
	} else {
		// creates line from the previous position of the path to the position of the line
		// end point of line
		// happens every time mouse is moved
		ctx.lineTo(x, y);
		// creates line after creating path
		ctx.stroke();
	}
}

function onMouseDown(e) {
	painting = true;
	console.log(e);
}

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
}

Array.from(colors).forEach((color) =>
	color.addEventListener('click', handleColorClick)
);
