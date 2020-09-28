let score = 0;
let lives = 10;
let fruits = [];
let gameState = false;

function setup() {
    createCanvas(400,300);
    frameRate(15);

    for (let i = 0; i < 3; i++) {
        // create new fruit
        let x = random(width);
        let y = height;
        let r = random(10,30);
        let c = color(random(0,255), random(0,255), random(0,255));
        let f = new Fruit(x, y, r, c);
        fruits.push(f);
    }
}

function draw() {

    background(0);

    // Display Score and Lives
    fill(0, 102, 160, 60);
    text('Score: ' + score.toString(), 10, 290);
    text('Lives: ' + lives.toString(), 250, 290);

    for (let i = 0; i < fruits.length; i++) {
        fruits[i].move();
        fruits[i].show();
        // if sliced, score++
        if (fruits[i].sliced) {
            score++;
        } 
        // .. if escaped, score--
        if (fruits[i].escaped) {
            fruits.splice(i);
            lives--;
        }
    }
    
    drawSlice();
    
    // if lives = 0, endgame
    if (lives < 1) {
        // endGame();
    }
}

function drawSlice(){
    stroke(126);
    line(mouseX, mouseY, pmouseX, pmouseY);
    print(pmouseX + ' -> ' + mouseX);
}

class Fruit {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.veloX = randomVeloX(x);
        this.veloY = random(-5, -30);
    }

    clicked(px, py){
        let d1 = dist(px, py, this.x, this.y);
        if (d1 < this.r){
            score++;
        }
    }

    sliced(){
        // figure out slicing function
    }

    move(){
        this.veloX *= 0.99; // air resistance
        this.veloY += 2; // gravity
        this.x = this.x + this.veloX;
        this.y = this.y + this.veloY;
    }

    show(){
        noStroke();
        fill(this.c);
        circle(this.x, this.y, this.r*2);
    }

    escaped(){
        if (this.y > height){
            return true;
        } else {
            return false;
        }
    }
}

function mousePressed() {
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].clicked(mouseX, mouseY);
    }
}

function randomVeloX(x) {
    if (x > width / 2) {
        return random(-10, -1);
    } else {
        return random(1, 10);
    }
}

function endGame() {

    noLoop();
  
    textAlign(CENTER);
    noStroke();
    fill("#888888");
    textSize(30);
    text("game over", width / 2, height / 2);
    textSize(10);
    text("Press f5 to restart!", width / 2, height / 2 + 30);
  }