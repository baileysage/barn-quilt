let triMatrix = new LEDTriMatrix(8, 60, Symmetry.None);


function setup() {
    createCanvas(480, 480);
    triMatrix.resetColors();
}

function draw() {
    triMatrix.draw();
}

let isMousePressed = false;

function isMouseOverGrid() {
    if (mouseX > 0 &&
        mouseX < triMatrix.controllableWidth()  &&
        mouseY > 0 &&
        mouseY < triMatrix.controllableHeight() ) {
        return true;
    }
    else {
        return false;
    }
}
function mousePressed() {
    isMousePressed = true;
    triPosition = -1;
    if (isMouseOverGrid()) {
        triPosition = triMatrix.calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        triMatrix.update(triPosition, color(255, 255, 255));
    }
}

function mouseDragged() {
    triPosition = -1;
    if (isMousePressed && isMouseOverGrid()) {
        triPosition = triMatrix.calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        triMatrix.update(triPosition, color(255, 255, 255));
    }
}

function mouseReleased() {
    isMousePressed = false;
    if (triPosition >= 0) {
        triMatrix.resetColors();
    }
}
