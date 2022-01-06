let m_leds = [
    111, 112, 79, 80, 47, 48, 15, 16,
    110, 113, 78, 81, 46, 49, 14, 17,
    109, 77, 114, 45, 82, 13, 50, 18,
    108, 76, 115, 44, 83, 12, 51, 19,
    75, 107, 43, 116, 11, 84, 20, 52,
    74, 106, 42, 117, 10, 85, 21, 53,
    73, 41, 105, 9, 118, 22, 86, 54,
    72, 40, 104, 8, 119, 23, 87, 55,
    39, 71, 7, 103, 24, 120, 56, 88,
    38, 70, 6, 102, 25, 121, 57, 89,
    37, 5, 69, 26, 101, 58, 122, 90,
    36, 4, 68, 27, 100, 59, 123, 91,
    3, 35, 28, 67, 60, 99, 92, 124,
    2, 34, 29, 66, 61, 98, 93, 125,
    1, 30, 33, 62, 65, 94, 97, 126,
    0, 31, 32, 63, 64, 95, 96, 127
];

class LEDTri {
    constructor(x, y, sideLen, fillColor, ledNum) {
        this.x = x;
        this.y = y;
        this.sideLen = sideLen;
        this.fillColor = fillColor;
        this.ledNum = ledNum;
    }

    update(newColor) {
        this.fillColor = newColor
    }

    draw() {
        let sY = (this.y - (this.y % 2)) / 2 * this.sideLen;
        let sX = this.x * this.sideLen;
        fill(this.fillColor);
        if (this.x % 2 == 0) {
            if (this.y % 4 == 0) {// Top right
                triangle(sX, sY, sX + this.sideLen, sY, sX + this.sideLen, sY + this.sideLen);
            }
            else if (this.y % 4 == 1) { // bottom left
                triangle(sX, sY, sX, sY + this.sideLen, sX + this.sideLen, sY + this.sideLen);
            }
            else if (this.y % 4 == 2) { //top left
                triangle(sX, sY, sX, sY + this.sideLen, sX + this.sideLen, sY);
            }
            else if (this.y % 4 == 3) { // bottom right
                triangle(sX, sY + this.sideLen, sX + this.sideLen, sY, sX + this.sideLen, sY + this.sideLen);
            }
        }
        else {
            if (this.y % 4 == 2) {// Top right
                triangle(sX, sY, sX + this.sideLen, sY, sX + this.sideLen, sY + this.sideLen);
            }
            else if (this.y % 4 == 3) { // bottom left
                triangle(sX, sY, sX, sY + this.sideLen, sX + this.sideLen, sY + this.sideLen);
            }
            else if (this.y % 4 == 0) { //top left
                triangle(sX, sY, sX, sY + this.sideLen, sX + this.sideLen, sY);

            }
            else if (this.y % 4 == 1) { // bottom right
                triangle(sX, sY + this.sideLen, sX + this.sideLen, sY, sX + this.sideLen, sY + this.sideLen);

            }
        }
    }
}

let squareWidth = 8;
let squareSize = 60;
let tris = []

function resetColors() {
    let index = 0;
    for (let y = 0; y < squareWidth * 2; y++) {
        for (let x = 0; x < squareWidth; x++) {
            r = map(x, 0, squareWidth, 0, 255);
            g = map(m_leds[index], 0, 127, 0, 255);
            b = map(y, 0, squareWidth, 0, 255);
            tris[index++] = new LEDTri(
                x,
                y,
                squareSize,
                color(r, g, b),
                m_leds[index - 1]
            );
        }
    }
}

function setup() {
    createCanvas(480, 480);
    resetColors();
}


function draw() {
    background(220);
    for (let i = 0; i < squareWidth * squareWidth * 2; i++) {
        tris[i].draw();
    }
}

let triPosition = -1;

function calcTrianglePosition(xPos, yPos) {
    xVal = Math.floor(xPos / squareSize);
    yCol = Math.floor(yPos / squareSize);
    yVal = 0;
    xInSquare = xPos - (xVal * squareSize);
    yInSquare = yPos - (yCol * squareSize);
    if (((xVal % 2 == 0 && yCol % 2 == 0) ||
        (xVal % 2 == 1 && yCol % 2 == 1))) {
        if (xInSquare <= yInSquare) {
            yVal = yCol * 2 + 1;
        }
        else {
            yVal = yCol * 2;
        }
    }
    else {
        if (xInSquare >= squareSize - yInSquare) {
            yVal = yCol * 2 + 1;
        }
        else {
            yVal = yCol * 2;
        }
    }
    triPosition = 8 * yVal + xVal;
}

let isMousePressed = false;

function isMouseOverGrid() {
    if (mouseX > 0 &&
        mouseX < squareSize * squareWidth &&
        mouseY > 0 &&
        mouseY < squareSize * squareWidth) {
        return true;
    }
    else {
        return false;
    }
}

function mousePressed() {
    isMousePressed = true;
    if (isMouseOverGrid()) {
        calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        tris[triPosition].update(color(255, 255, 255));
    }
}

function mouseDragged() {
    if (isMousePressed && isMouseOverGrid()) {
        calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        tris[triPosition].update(color(255, 255, 255));
    }
}

function mouseReleased() {
    isMousePressed = false;
    if (triPosition >= 0) {
        resetColors();
    }
    triPosition = -1;
}
