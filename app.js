const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.controls__colors');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const reset = document.querySelector('#jsReset');
const save = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => {
	painting = false;
};

const startPainting = () => {
	painting = true;
};

const onMouseMove = (e) => {
	const x = e.offsetX;
	const y = e.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};

const onMouseDown = () => {
	painting = true;
};

const handleClick = () => {
	if (filling === true) {
		ctx.fillStyle = ctx.strokeStyle;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
};

const handleCM = (e) => {
	e.preventDefault();
};

// change color
const changeColor = (e) => {
	let brushcolor = e.target.style.backgroundColor;
	ctx.strokeStyle = brushcolor;
};

// change brush size
const changeBrushSize = (e) => {
	let brushsize = e.target.value;
	ctx.lineWidth = brushsize;
};

// change mode
const changeMode = () => {
	if (filling === true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
	}
};

// handle reset
const handleReset = () => {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// save file
const handleSaveFile = () => {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'mypainting';
	link.click();
};

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleClick);
	canvas.addEventListener('contextmenu', handleCM);
}

colors.addEventListener('click', changeColor);
range.addEventListener('input', changeBrushSize);
mode.addEventListener('click', changeMode);
reset.addEventListener('click', handleReset);
save.addEventListener('click', handleSaveFile);
