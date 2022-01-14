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

class LEDTriMatrix{
    constructor(matrixWidth, triSize) {
        this.matrixWidth = matrixWidth;
        this.triSize = triSize;
        this.tris = [];
    }

    draw() {
        background(220);
        for (let i = 0; i < this.matrixWidth * this.matrixWidth * 2; i++) {
            this.tris[i].draw();
        }
    }

    totalWidth(){
        return this.triSize * this.matrixWidth
    }

    resetColors() {
        let index = 0;
        for (let y = 0; y < this.matrixWidth * 2; y++) {
            for (let x = 0; x < this.matrixWidth; x++) {
                let r = map(x, 0, this.matrixWidth, 0, 255);
                let g = map(m_leds[index % 64], 0, 127, 0, 255);
                let b = map(y, 0, this.matrixWidth, 0, 255);
                this.tris[index++] = new LEDTri(
                    x,
                    y,  
                    this.triSize,
                    color(r, g, b),
                    m_leds[(index - 1) % 64]
                );
            }
        }
    }

    calcTrianglePosition(xPos, yPos) {
        let xVal = Math.floor(xPos / this.triSize);
        let yCol = Math.floor(yPos / this.triSize);
        let yVal = 0;
        let xInSquare = xPos - (xVal * this.triSize);
        let yInSquare = yPos - (yCol * this.triSize);
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
            if (xInSquare >= this.triSize - yInSquare) {
                yVal = yCol * 2 + 1;
            }
            else {
                yVal = yCol * 2;
            }
        }
        return this.matrixWidth * yVal + xVal;
    }

    calcVerticalSymmetry(triPosition) {
        return triPosition - (triPosition % this.matrixWidth) + (this.matrixWidth - 1 - (triPosition % this.matrixWidth));
    }

}