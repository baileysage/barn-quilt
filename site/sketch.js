let triMatrix = new LEDTriMatrix(8, 60, Symmetry.None);
var color_a_pick;
var color_b_pick;

function setup() {
    createCanvas(700, 480);
    background("white");

    noSymbutton = createButton('No Symmetry');
    noSymbutton.position(550, 65);
    noSymbutton.mousePressed(setNoSymmetry);

    hSymbutton = createButton('Horizontal Symmetry');
    hSymbutton.position(550, 95);
    hSymbutton.mousePressed(setHorizSymmetry);

    vSymbutton = createButton('Vertical Symmetry');
    vSymbutton.position(550,125);
    vSymbutton.mousePressed(setVertSymmetery);

    fSymbutton = createButton('Full Symmetry');
    fSymbutton.position(550, 155);
    fSymbutton.mousePressed(setFullSymmetry);

    resetbutton = createButton('Reset');
    resetbutton.position(550, 185);
    resetbutton.mousePressed(resetGrid);

    color_a_pick = createColorPicker("red");
    color_a_pick.position(550, 215);
    color_b_pick = createColorPicker("yellow");
    color_b_pick.position(550, 255);
    
    resetGrid();
}

function draw() {
    triMatrix.draw();
    fill(color(0, 0, 0));
    text("Color A", 615, 227);
    text("Color B", 615, 267);
}

function setNoSymmetry(){
    triMatrix.sym = Symmetry.None;
    resetGrid();
}

function setHorizSymmetry(){
    triMatrix.sym = Symmetry.Horizontal;
    resetGrid();
}

function setVertSymmetery(){
    triMatrix.sym = Symmetry.Vertical;
    resetGrid();
}

function setFullSymmetry(){
    triMatrix.sym = Symmetry.Full;
    resetGrid();
}

function resetGrid(){
    triMatrix.resetColors(color_a_pick.color());
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
        triMatrix.update(triPosition, color_b_pick.color());
    }
}

function mouseDragged() {
    triPosition = -1;
    if (isMousePressed && isMouseOverGrid()) {
        triPosition = triMatrix.calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        triMatrix.update(triPosition, color_b_pick.color());
    }
}

function mouseReleased() {
    isMousePressed = false;
}
