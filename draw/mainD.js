document.getElementById("saveButton").addEventListener("click", handleSaveDrawing);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
const shapes = [];
//localstorage

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

        shapeItem.innerText = `${index + 1} | Form: ${shape.type} | Color: ${shape.color} | Size: ${shape.size} `;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.style.marginLeft = "10px"; 

        const editButton = document.createElement("button");
        editButton.innerText = editingShapeIndex === index ? "Save" : "Edit";
        editButton.style.marginLeft = "10px"; 

        deleteButton.addEventListener("click", () => {
            saveToHistory();
            shapes.splice(index, 1); 
            updateShapeList(); 
            redrawCanvas(); 
            saveShapesToLocalStorage();
            
        });

        editButton.addEventListener("click", () => {
            
            if (editingShapeIndex === index) {
                saveToHistory();
                
                // Guarda i aplica valors
                const newColor = document.getElementById("colorInput").value;
                const newSize = parseInt(document.getElementById("sizeInput").value, 10);
                const newFill = document.getElementById("fillShape").value === "true";
                
                shapes[index].color = newColor;
                shapes[index].size = newSize;
                shapes[index].filled = newFill;
                editingShapeIndex = null;
            } else {
                editMode(index); // Activa mode edició

                // Aplica valors del shape als selects

                const shapeColor = shapes[index].color;
                const shapeSize = shapes[index].size;
                const shapeFill = shapes[index].filled;

                document.getElementById("colorInput").value = shapeColor;
                document.getElementById("fillShape").value = shapeFill;
                document.getElementById("sizeInput").value = shapeSize;

            }
            updateShapeList(); 
            redrawCanvas(); 
            saveShapesToLocalStorage();
        });

        shapeItem.appendChild(deleteButton);
        shapeItem.appendChild(editButton);
        figureList.appendChild(shapeItem);
    });
};

const redrawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    shapes.forEach(shape => {
        
        if (shape.type === "square") {
            drawRect(shape.x, shape.y, shape.size, shape.size, shape.color, shape.filled);
        } else if (shape.type === "circle") {
            drawCircle(shape.x, shape.y, shape.size / 2, shape.color, shape.filled);
        } else if (shape.type === "triangle") {
            drawTriangle(shape.x, shape.y, shape.size, shape.color, shape.filled);
        } else if (shape.type === "star") {
            drawStar(shape.x, shape.y, shape.size, shape.color, shape.filled);
        }
    });
};

// Almacenar en el localStorage y actualitza
const saveShapesToLocalStorage = () => {
    localStorage.setItem("shapes", JSON.stringify(shapes));
    updateShapeList();
    redrawCanvas();
};

document.addEventListener("DOMContentLoaded", () => {
    const savedShapes = localStorage.getItem("shapes");
    
    if (savedShapes) {
        shapes.push(...JSON.parse(savedShapes));
        redrawCanvas();  
        updateShapeList();  
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (shapes.length) {
        redrawCanvas();
        updateShapeList();
    }
});

canvas.addEventListener("mousedown", (event) => {
    saveToHistory();
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

// Depenent si estam en mode edició el canvas fara una cosa o altre
    if (editingShapeIndex !== null) {
        shapes[editingShapeIndex].x = x;
        shapes[editingShapeIndex].y = y;

        updateShapeList();
        redrawCanvas();
        saveShapesToLocalStorage();
    } else {
        const size = parseInt(document.getElementById("sizeInput").value, 10);
        const color = document.getElementById("colorInput").value;
        const type = document.getElementById("shapeType").value;
        const filled = document.getElementById("fillShape").value === "true";

        if (type === "square") {
            drawRect(x, y, size, size, color, filled);
            shapes.push({ type: "square", x, y, size, color, filled });
        } else if (type === "circle") {
            drawCircle(x, y, size / 2, color, filled);
            shapes.push({ type: "circle", x, y, size, color, filled });
        } else if (type === "triangle") {
            drawTriangle(x, y, size, color, filled);
            shapes.push({ type: "triangle", x, y, size, color, filled });
        } else if (type === "star") {
            drawStar(x, y, size, color, filled);
            shapes.push({ type: "star", x, y, size, color, filled });
        } else if (type === "selectshape") {
            
        }

        document.getElementById("inputobjectes").value = JSON.stringify(shapes);
        updateShapeList();
        saveShapesToLocalStorage();
    }
});

canvas.addEventListener("mousemove", (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    drawLine(x, y);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);


function handleSaveDrawing() {
    const drawingName = document.getElementById("namepaint").value;
    const shapesData = JSON.stringify(shapes);  // Convert shapes to JSON string

    if (!drawingName || shapes.length === 0) {
        alert("Please provide a name and add at least one shape before saving.");
        return;
    }

    // Crear el objeto FormData para enviar los datos
    const formData = new FormData();
    formData.append("name", drawingName);
    formData.append("paints", shapesData);

    fetch("/save-drawing", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.success) {
            alert("Drawing saved successfully!");
        } else {
            alert("There was an error saving your drawing.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Could not connect to the server.");
    });

}

let editingShapeIndex = null; 

const editMode = (index) => {
    if (editingShapeIndex === index) {

        editingShapeIndex = null;
        updateShapeList(); 
        redrawCanvas();
        return;
    }

    editingShapeIndex = index;
    updateShapeList(); 
};

document.getElementById("deleteButton").addEventListener("click", () => {
    saveToHistory();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.length = 0;
    localStorage.removeItem("shapes");
    updateShapeList();

});

// Historial
const historyStack = [];
const redoStack = [];

// Guarda el estat actual
const saveToHistory = () => {
    historyStack.push(JSON.stringify(shapes)); 
    if (historyStack.length > 25) {
        historyStack.shift();
    }
    redoStack.length = 0;
};

// Retrocedeix al estat anterior
document.getElementById("left").addEventListener("click", () => {
    if (historyStack.length === 0) {
        alert("No previous state to revert to.");
        return;
    }

    redoStack.push(JSON.stringify(shapes));
    const previousState = historyStack.pop(); 
    shapes.length = 0; 
    shapes.push(...JSON.parse(previousState));

    redrawCanvas();
    updateShapeList();
});

// Avança el estat
document.getElementById("right").addEventListener("click", () => {
    if (redoStack.length === 0) {
        alert("No future state to redo.");
        return;
    }

    historyStack.push(JSON.stringify(shapes));
    const nextState = redoStack.pop(); 
    shapes.length = 0; 
    shapes.push(...JSON.parse(nextState));

    redrawCanvas();
    updateShapeList();
});

//detectar shapes

