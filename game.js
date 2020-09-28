let d = 30;
let cx = 30;
let cy = 30;
let cnv;
let score = 0;
function setup() {
    cnv = createCanvas(500,500);
    cnv.mouseOver(changeGray);
}

function draw() {

    background(50);
    fill = rbg(0,0,255);
    circle(cx, cy, d);

}

function fruit() {
    // set random position
    // set velocity
}

// check if sliced
// if sliced, score++

// check if fruit escaped
// .. if escaped, score--

// game state
// .. if 0 end game