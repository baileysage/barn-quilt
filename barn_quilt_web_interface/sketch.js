let triMatrix = new HalfSquareTriangleMatrix(8, 60, Symmetry.None);
var background_color_pick;
var foreground_color_pick;

function setup() {
    const canvas = createCanvas(750, 480);
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    noSymbutton = createButton('No Symmetry');
    noSymbutton.position(550, 35);
    noSymbutton.mousePressed(setNoSymmetry);
    noSymbutton.style('background-color', "lightskyblue");
    noSymbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    hSymbutton = createButton('Horizontal Symmetry');
    hSymbutton.position(550, 65);
    hSymbutton.mousePressed(setHorizSymmetry);
    hSymbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    vSymbutton = createButton('Vertical Symmetry');
    vSymbutton.position(550,95);
    vSymbutton.mousePressed(setVertSymmetery);
    vSymbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    fSymbutton = createButton('Horiz AND Vert Symmetry');
    fSymbutton.position(550, 125);
    fSymbutton.mousePressed(setFullSymmetry);
    fSymbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    rSymbutton = createButton('Rotational Symmetry');
    rSymbutton.position(550, 155);
    rSymbutton.mousePressed(setRotationalSymmetry);
    rSymbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    resetbutton = createButton('Reset');
    resetbutton.position(550, 185);
    resetbutton.mousePressed(resetGrid);
    resetbutton.elt.addEventListener("contextmenu", (e) => e.preventDefault());

    background_color_pick = createColorPicker("red");
    background_color_pick.position(550, 235);
    background_color_pick.elt.addEventListener("contextmenu", (e) => e.preventDefault());
    foreground_color_pick = createColorPicker("yellow");
    foreground_color_pick.position(550, 285);
    foreground_color_pick.elt.addEventListener("contextmenu", (e) => e.preventDefault());
    
    background(220);

    text("Background Color", 542, 220);
    text("Foreground Color", 542, 280);

    resetGrid();
}

function draw() {
    triMatrix.draw();
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
    triMatrix.resetGrid(background_color_pick.value());
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
            triMatrix.updateTriangle(triPosition, foreground_color_pick.value(), true);
        }
        if (mouseButton == RIGHT){
            triMatrix.updateTriangle(triPosition, background_color_pick.value(), false);
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
            triMatrix.updateTriangle(triPosition, foreground_color_pick.value(), true);
        }
        if (mouseButton == RIGHT){
            triMatrix.updateTriangle(triPosition, background_color_pick.value(), false);
        }
    }
}

function mouseReleased() {
    isMousePressed = false;
}
