const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option")); //html obj to array
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width= 800;
canvas.height= 800;
ctx.lineWidth= lineWidth.value;
ctx.lineCap = "round";

/* Create Rect
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.lineWidth = 2;
ctx.fillRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();
*/


/*
//body
ctx.fillRect(180, 140, 15, 100); //l팔
ctx.fillRect(305, 140, 15, 100); //r팔
ctx.fillRect(230, 140, 45, 150); //몸


//head
ctx.arc(250,100, 40, 0, 2 * Math.PI); //머리
ctx.fillStyle = "black";
ctx.fill();


//eye
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(230,90, 7, 1 * Math.PI, 2 * Math.PI); //l눈
ctx.arc(270,90, 7, 1 * Math.PI, 2 * Math.PI); //r눈
ctx.fill();
*/

//function-1
/*
ctx.lineWidth = 3;

function onClick(event) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
};

canvas.addEventListener("mousemove", onClick);
*/

//function-2

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown(){
    isPainting = true;
}
function onMouseUp() {
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value; 
}
function onColorClick(event) {
    const ColorValue = event.target.dataset.color;
    ctx.strokeStyle = ColorValue;
    ctx.fillStyle = ColorValue;
    color.value = ColorValue;
}
function onModeClick(event) {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function onCanvasClick () {
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
    ctx.strokeStyle = "white"
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDoubleClick(event) {
    const text = textInput.value;
    if(text!==""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif"
    ctx.fillText(text, event.offsetX, event.offsetY)
    ctx.restore();
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url
    a.download = "myDrawing.png"
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick)); // array - foreach - addeventlistener
modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);