//const 0 = JSON.parse(json); para pasar de string a json
//JSON.stringify para lo contrario
//para borrar una figura habra que hacer un redibujo con todas la figuras menos la que hemos borrado

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

const drawRect = (x, y, w, h, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

const drawCircle = (x, y, radius, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); 
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};

const drawTriangle = (x, y, size, color) => {
    ctx.beginPath();
    ctx.moveTo(x, y); 
    ctx.lineTo(x - size / 2, y + size); 
    ctx.lineTo(x + size / 2, y + size); 
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
};


const startDrawing = (x, y, color, size) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = size / 5; 
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
};

const drawLine = (x, y) => {
    if (!isDrawing) return;
    ctx.lineTo(x, y);
    ctx.stroke();
};

const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
};

const drawStar = (x, y, size, color) => {
    const points = 7;
    const outerRadius = size;
    const innerRadius = size / 2.5;
    const angle = Math.PI / points; 

    ctx.beginPath();
    ctx.fillStyle = color;

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const px = x + radius * Math.cos(i * angle);
        const py = y + radius * Math.sin(i * angle);
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();
    ctx.fill();
};

canvas.addEventListener("mousedown", (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    const size = parseInt(document.getElementById("sizeInput").value, 10);
    const color = document.getElementById("colorInput").value;
    const shape = document.getElementById("shapeType").value;

    if (shape === "square") {
        drawRect(x, y, size, size, color);
    } else if (shape === "circle") {
        drawCircle(x, y, size / 2, color);
    } else if (shape === "triangle") {
        drawTriangle(x, y, size, color);
    } else if (shape === "star") {
        drawStar(x, y, size, color);
    } else if (shape === "hand") {
        startDrawing(x, y, color, size);
    }
});


canvas.addEventListener("mousemove", (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    drawLine(x, y);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);