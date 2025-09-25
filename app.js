const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

//ctx = context
const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

//режим рисования на объекте canva
let painting = false;
//режим заливки холста на объекте canva
let filling = false;

function stopPainting(){
    painting = false
}

function startPainting(){
    painting = true;
}
function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRengeChange(event){
    const rengeValue = event.target.value
   ctx.lineWidth = rengeValue;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = 'Заливка';
    }else{
        filling = true;
        mode.innerText = 'Риосвание';
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href  = image;
    link.download = "PaintJS [Export].jpg";
    link.click();
    
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown',onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);

}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if(range){
    range.addEventListener('input', handleRengeChange);
}

if(mode){
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}