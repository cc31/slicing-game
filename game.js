let circleColor = (200,200,200); // colour
let cnv;
let score = 0;
let lives = 3;

function setup() {
    cnv = createCanvas(300,300);
    frameRate(10);
}

function draw() {

    background(50);

    fill(0, 102, 153, 51);
    text('Score: ' + score.toString(), 10, 290);

    fruit(30, 30, 20, 0);
    drawSlice();

    // check if sliced
    // if sliced, score++
    if (mouseIsOverCircle (30,30,20/2)) {
        circleColor = color (0, 0, 255);
        score++;
    } else {
        circleColor = color (200, 200 , 200);
    }

    // check if fruit escaped
    // .. if escaped, score--

    // if lives = 0, endgame
}

function drawSlice(){
    stroke(126);
    line(mouseX, mouseY, pmouseX, pmouseY);
    print(pmouseX + ' -> ' + mouseX);
}

function fruit(cx, cy, d, velocity) {
    noStroke();
    fill(circleColor);
    circle(cx, cy, d);
 
    // set random position
    // set velocity
}

function mouseIsOverCircle(x, y, radius) {
    var result;
    //calculate distance betwween mouse posiiton and ellipse poisition
    var d = dist(mouseX, mouseY, x, y);
    if (d < radius){
    	result = true;
    } else {
    	result = false;
    }
    return result;
}