let triMatrix = new LEDTriMatrix(8, 60, Symmetry.None);
var background_color_pick;
var foreground_color_pick;

function setup() {
    const canvas = createCanvas(750, 480);
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault());
    background("white");

    noSymbutton = createButton('No Symmetry');
    noSymbutton.position(550, 35);
    noSymbutton.mousePressed(setNoSymmetry);
    noSymbutton.style('background-color', "lightskyblue");

    hSymbutton = createButton('Horizontal Symmetry');
    hSymbutton.position(550, 65);
    hSymbutton.mousePressed(setHorizSymmetry);

    vSymbutton = createButton('Vertical Symmetry');
    vSymbutton.position(550,95);
    vSymbutton.mousePressed(setVertSymmetery);

    fSymbutton = createButton('Horiz AND Vert Symmetry');
    fSymbutton.position(550, 125);
    fSymbutton.mousePressed(setFullSymmetry);

    rSymbutton = createButton('Rotational Symmetry');
    rSymbutton.position(550, 155);
    rSymbutton.mousePressed(setRotationalSymmetry);

    resetbutton = createButton('Reset');
    resetbutton.position(550, 185);
    resetbutton.mousePressed(resetGrid);

    background_color_pick = createColorPicker("red");
    background_color_pick.position(550, 235);
    foreground_color_pick = createColorPicker("yellow");
    foreground_color_pick.position(550, 285);
    
    resetGrid();
}

function draw() {
    triMatrix.draw();
    fill(color(0, 0, 0));
    text("Background Color", 542, 220);
    text("Foreground Color", 542, 270);

}

function setNoSymmetry(){
    triMatrix.sym = Symmetry.None;
    noSymbutton.style('background-color', "lightskyblue");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightgrey");
    rSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setHorizSymmetry(){
    triMatrix.sym = Symmetry.Horizontal;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightskyblue");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightgrey");
    rSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setVertSymmetery(){
    triMatrix.sym = Symmetry.Vertical;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightskyblue");
    fSymbutton.style('background-color', "lightgrey");
    rSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setFullSymmetry(){
    triMatrix.sym = Symmetry.Full;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightskyblue");
    rSymbutton.style('background-color', "lightgrey");
    resetGrid();
}

function setRotationalSymmetry(){
    triMatrix.sym = Symmetry.Rotational;
    noSymbutton.style('background-color', "lightgrey");
    hSymbutton.style('background-color', "lightgrey");
    vSymbutton.style('background-color', "lightgrey");
    fSymbutton.style('background-color', "lightgrey");
    rSymbutton.style('background-color', "lightskyblue");
    resetGrid();
}

function resetGrid(){
    triMatrix.resetColors(background_color_pick.color());
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
        if (mouseButton == LEFT){
            triMatrix.update(triPosition, foreground_color_pick.color(), true);
        }
        if (mouseButton == RIGHT){
            triMatrix.update(triPosition, background_color_pick.color(), false);
        }
    }
}

function mouseDragged() {
    triPosition = -1;
    if (isMousePressed && isMouseOverGrid()) {
        triPosition = triMatrix.calcTrianglePosition(mouseX, mouseY);
    }
    if (triPosition >= 0) {
        if (mouseButton == LEFT){
            triMatrix.update(triPosition, foreground_color_pick.color(), true);
        }
        if (mouseButton == RIGHT){
            triMatrix.update(triPosition, background_color_pick.color(), false);
        }
    }
}

function mouseReleased() {
    isMousePressed = false;
}
