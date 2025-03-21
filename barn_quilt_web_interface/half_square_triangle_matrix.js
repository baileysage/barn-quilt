
const Symmetry = {
    Vertical: 'Vertical',
    Horizontal: 'Horizontal',
    Full: 'Full',
    Rotational: 'Rotational',
    None: 'None'
};

class HalfSquareTriangle {
    constructor(x, y, sideLen, fillColor) {
        this.x = x;
        this.y = y;
        this.sideLen = sideLen;
        this.fillColor = fillColor;
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

class HalfSquareTriangleMatrix {
    constructor(matrixWidth, triSize, sym) {
        this.matrixWidth = matrixWidth;
        this.triSize = triSize;
        this.tris = [];
        this.sym = sym;
    }

    draw() {
        for (let i = 0; i < this.matrixWidth * this.matrixWidth * 2; i++) {
            this.tris[i].draw();
        }
    }

    update(triPosition, newColor, isForeground){
        let nonEditableColor = color(150, 150, 150);
        switch(this.sym) {
            case Symmetry.None:
                this.tris[triPosition].update(newColor);
                break;
            case Symmetry.Vertical:
                this.tris[triPosition].update(newColor);
                this.tris[this.calcVerticalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                break;
            case Symmetry.Horizontal:
                this.tris[triPosition].update(newColor);
                this.tris[this.calcHorizontalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                break;
            case Symmetry.Full:
                this.tris[triPosition].update(newColor);
                this.tris[this.calcHorizontalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                this.tris[this.calcVerticalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                this.tris[this.calcVertAndHorizSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                break;
            case Symmetry.Rotational:
                this.tris[triPosition].update(newColor);
                this.tris[this.calc90RotationalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                this.tris[this.calc180RotationalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
                this.tris[this.calc270RotationalSymmetry(triPosition)].update(isForeground ? newColor : nonEditableColor);
            default: 
                this.tris[triPosition].update(newColor);
        } 
    }

    totalWidth() {
        return this.triSize * this.matrixWidth
    }

    controllableWidth(){
        switch(this.sym) {
            case Symmetry.Vertical:
            case Symmetry.Full:
            case Symmetry.Rotational:
                return this.totalWidth() / 2;
            case Symmetry.Horizontal:
            case Symmetry.None:
            default: 
                return this.totalWidth();
        } 
    }

    controllableHeight(){
        switch(this.sym) {
            case Symmetry.Horizontal:
            case Symmetry.Full:
            case Symmetry.Rotational:
                return this.totalWidth() / 2;
            case Symmetry.Vertical:
            case Symmetry.None:
            default: 
                return this.totalWidth();
        } 
    }

    isControllable(triPosition){
        switch(this.sym) {
            case Symmetry.None:
                return true;
            case Symmetry.Vertical:
                return triPosition % this.matrixWidth < this.matrixWidth / 2;
            case Symmetry.Horizontal:
                return triPosition < this.matrixWidth * this.matrixWidth;
            case Symmetry.Full:
            case Symmetry.Rotational:
                return (triPosition < this.matrixWidth * this.matrixWidth) && 
                        (triPosition % this.matrixWidth < this.matrixWidth / 2);
            default: 
                return false;
        }
    }

    resetColors(defaultBackgroundColor) {
        let nonEditableColor = color(150, 150, 150);
        for (let y = 0; y < this.matrixWidth * 2; y++) {
            for (let x = 0; x < this.matrixWidth; x++) {
                let drawColor = this.isControllable(y*this.matrixWidth + x) ? defaultBackgroundColor : nonEditableColor;
                this.tris[y*this.matrixWidth + x] = new HalfSquareTriangle(
                    x,
                    y,
                    this.triSize,
                    drawColor
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


    calcHorizontalSymmetry(triPosition) {
        let xCol = triPosition % this.matrixWidth;
        let yRow = (triPosition - xCol) / this.matrixWidth;
        return ((this.matrixWidth * 2) - yRow - 1) * this.matrixWidth + xCol;
    }

    calcVertAndHorizSymmetry(triPosition){
        return this.calcHorizontalSymmetry(this.calcVerticalSymmetry(triPosition));
    }

    calc90RotationalSymmetry(triPosition) {
        let xColIn = triPosition % this.matrixWidth;
        let yRowIn = (triPosition - xColIn) / this.matrixWidth;

        let xColOut = this.matrixWidth - Math.floor(yRowIn / 2) - 1;
        let yRowOut = 2 * xColIn;
        if (xColIn % 2 ){ // Odd columns
            if (yRowIn % 4 == 1 || yRowIn % 4 == 2){
                yRowOut = yRowOut + 1;
            }
        }
        else { // Even columns
            if (yRowIn % 4 == 0 || yRowIn % 4 == 3){
                yRowOut = yRowOut + 1;
            }
        }
        
        return this.matrixWidth * yRowOut + xColOut;
    }

    calc180RotationalSymmetry(triPosition) {
        return this.matrixWidth * this.matrixWidth * 2 - triPosition - 1;
    }

    calc270RotationalSymmetry(triPosition) {
        let xColIn = triPosition % this.matrixWidth;
        let yRowIn = (triPosition - xColIn) / this.matrixWidth;

        let xColOut = Math.floor(yRowIn / 2);
        let yRowOut = 2 * ( this.matrixWidth - xColIn) - 1;
        if (xColIn % 2 ){ // Odd columns
            if (yRowIn % 4 == 1 || yRowIn % 4 == 2){
                yRowOut = yRowOut - 1;
            }
        }
        else { // Even columns
            if (yRowIn % 4 == 0 || yRowIn % 4 == 3){
                yRowOut = yRowOut - 1;
            }
        }
        
        return this.matrixWidth * yRowOut + xColOut;
    }

}