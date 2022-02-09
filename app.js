const canvas = document.getElementById('jsCanvas');
// get canvas' 2D rendering context
// context to manipulate pixels inside canvas
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

// to give size to the pixel manipulation
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
}

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(e) {
	const size = e.target.value;
	ctx.lineWidth = size;
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleCM(e) {
	// prevents right click within canvas
	e.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = "PaintJS[🎨]";

	link.click();
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
	color.addEventListener('click', handleColorClick)
);

if (range) {
	range.addEventListener('input', handleRangeChange);
}

if (mode) {
	mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener('click', handleSaveClick);
}