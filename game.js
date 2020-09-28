let score;
let lives;
let fruits = [];
let gameState = false;

function setup() {
    createCanvas(400,300);
    frameRate(30);
    lives = 10;
    score = 0;
}

function draw() {
    background(0);

    drawSlice();
    drawFruit();
    drawScore();
    
    // if lives = 0, endgame
    if (lives < 1) {
        endGame();
    }
}

function drawScore(){
    // Display Score and Lives
    noStroke();
    fill("#ffffff");
    text('Score: ' + score.toString(), 10, 20);
    noStroke();
    fill("#ffffff");
    text('Lives: ' + lives.toString(), width-60, 20);
}

function drawSlice(){
    stroke(126);
    line(mouseX, mouseY, pmouseX, pmouseY);
    // print(pmouseX + ' -> ' + mouseX);
}

function drawFruit(){

    if (frameCount % 30 === 0) {
        let x = random(width);
        let y = height;
        let r = random(10,30);
        let c = color(random(100,255), random(100,255), random(100,255));
        let f = new Fruit(x, y, r, c);
        fruits.push(f);
    }

    for (let i = 0; i < fruits.length; i++) {
        fruits[i].move();
        fruits[i].show();
        if (fruits[i].clicked()) {
            score++;
        }
        if (fruits[i].escaped) {
            fruits.splice(i,1);
            lives--;
        }
    }
}

class Fruit {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.veloX = randomVeloX(x);
        this.veloY = random(-10, -15);
        this.escaped = false;
    }

    clicked(px, py){
        let d1 = dist(px, py, this.x, this.y);
        if (d1 < this.r){
            score++;
            this.r = 0;
        }
    }

    sliced(){
        // figure out slicing function
    }

    move(){
        this.veloX *= 0.99; // air resistance
        this.veloY += 0.5; // gravity
        this.x += this.veloX;
        this.y += this.veloY;
        if (this.y > height) {
            this.escaped = true;
        }
    }

    show(){
        noStroke();
        fill(this.c);
        circle(this.x, this.y, this.r*2);
    }
}

function mousePressed() {
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].clicked(mouseX, mouseY);
    }
}

function randomVeloX(x) {
    if (x > width / 2) {
        return random(-4, -0.5);
    } else {
        return random(0.5, 4);
    }
}

function endGame() {

    noLoop();
  
    textAlign(CENTER);
    noStroke();
    fill("#999999");
    textSize(30);
    text("game over", width / 2, height / 2);
    textSize(10);
    text("Press f5 to restart!", width / 2, height / 2 + 30);
}