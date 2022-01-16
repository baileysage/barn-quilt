let triMatrix = new LEDTriMatrix(8, 60, Symmetry.None);
var color_a_pick;
var color_b_pick;

function setup() {
    createCanvas(700, 480);
    background("white");

    noSymbutton = createButton('No Symmetry');
    noSymbutton.position(550, 65);
    noSymbutton.mousePressed(setNoSymmetry);
    noSymbutton.style('background-color', "lightskyblue");

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
    noSymbutton.style('background-color', "lightskyblue");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setHorizSymmetry(){
    triMatrix.sym = Symmetry.Horizontal;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightskyblue");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setVertSymmetery(){
    triMatrix.sym = Symmetry.Vertical;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightskyblue");
    fSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setFullSymmetry(){
    triMatrix.sym = Symmetry.Full;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightskyblue");
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
