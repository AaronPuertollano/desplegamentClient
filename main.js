//const 0 = JSON.parse(json); para pasar de string a json
//JSON.stringify para lo contrario
//para borrar una figura habra que hacer un redibujo con todas la figuras menos la que hemos borrado

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
const shapes = [];

const drawRect = (x, y, w, h, color, filled) => {
    ctx.beginPath();
    if (filled) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    } else {
        ctx.strokeStyle = color;
        ctx.rect(x, y, w, h);
        ctx.stroke();
    }
}; 

const drawCircle = (x, y, radius, color, filled) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); 
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.closePath();
};

const drawTriangle = (x, y, size, color, filled) => {
    ctx.beginPath();
    ctx.moveTo(x, y); 
    ctx.lineTo(x - size / 2, y + size); 
    ctx.lineTo(x + size / 2, y + size); 
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
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

const drawStar = (x, y, size, color, filled) => {
    const points = 7;
    const outerRadius = size;
    const innerRadius = size / 2.5;
    const angle = Math.PI / points; 

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

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
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

const updateShapeList = () => {
    figureList.innerHTML = "";
    shapes.forEach((shape, index) => {
        const shapeItem = document.createElement("p");
        shapeItem.innerText = `#${index + 1} - ${shape.type} | Color: ${shape.color} | Tamaño: ${shape.size} | Relleno: ${shape.filled ? "Sí" : "No"}`;
        figureList.appendChild(shapeItem);
    });
};

canvas.addEventListener("mousedown", (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    const size = parseInt(document.getElementById("sizeInput").value, 10);
    const color = document.getElementById("colorInput").value;
    const type = document.getElementById("shapeType").value;
    const filled = document.getElementById("fillShape").value === "true";

    if (type === "square") {
        drawRect(x, y, size, size, color, filled);
        shapes.push({ type: "square", x, y, size, color, filled });
    } else if (type === "circle") {
        drawCircle(x, y, size / 2, color, filled);
        shapes.push({ type: "circle", x, y, radius: size / 2, color, filled });
    } else if (type === "triangle") {
        drawTriangle(x, y, size, color, filled);
        shapes.push({ type: "triangle", x, y, size, color, filled });
    } else if (type === "star") {
        drawStar(x, y, size, color, filled);
        shapes.push({ type: "star", x, y, size, color, filled });
    } else if (type === "hand") {
        startDrawing(x, y, color, size);
    }

    //let element = document.getElementById("inputobjectes");
    //element.value = Object;
    //json.stringyfy()
    //hacer puch a la lista para almacenar las figuras

    document.getElementById("inputobjectes").value = JSON.stringify(shapes);
    updateShapeList();
});


canvas.addEventListener("mousemove", (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    drawLine(x, y);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

//bt elements = document.getelementbyid("inputobj")
//element.value = objectes;
//hacerlo cada vez que hay una modificación de canva