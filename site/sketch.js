let triMatrix = new LEDTriMatrix(8, 60);

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
        mouseX < triMatrix.totalWidth() &&
        mouseY > 0 &&
        mouseY < triMatrix.totalWidth()) {
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
        triMatrix.tris[triPosition].update(color(255, 255, 255));
        triMatrix.tris[triMatrix.calcHorizontalSymmetry(triPosition)].update(color(255, 255, 255));
    }
}

function mouseDragged() {
    triPosition = -1;
    if (isMousePressed && isMouseOverGrid()) {
        triPosition = triMatrix.calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        triMatrix.tris[triPosition].update(color(255, 255, 255));
        triMatrix.tris[triMatrix.calcHorizontalSymmetry(triPosition)].update(color(255, 255, 255));
    }
}

function mouseReleased() {
    isMousePressed = false;
    if (triPosition >= 0) {
        triMatrix.resetColors();
    }
}
