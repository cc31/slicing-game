let score;
let lives;
let fruits = [];
let gameState = false;
let interval;

function setup() {
    createCanvas(400,300);
    frameRate(30);
    lives = 3;
    score = 0;
    interval = 30;
}

function draw() {
    background(0);

    drawSlice();
    drawFruit();
    drawScore();
    speedUp();
    
    if (lives < 1) {
        endGame();
    }
}

function drawScore(){
    // Display Score and Lives
    textAlign(LEFT);
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

function speedUp(){
    if (frameCount % 50 === 0){
        interval--;
        console.log('interval: '+ interval);
    }
}

function drawFruit(){

    if (frameCount % interval === 0) {
        console.log(frameCount);
        let x = random(width);
        let y = height;
        let r = random(10,30);
        let c = color(random(100,255), random(100,255), random(100,255));
        let f = new Fruit(x, y, r, c);
        if (frameCount % 35 === 0) {
            f.bomb = true;
            f.c = color(255, 0, 0);
        } 
        fruits.push(f);
    }

    for (let i = 0; i < fruits.length; i++) {
        fruits[i].move();
        fruits[i].show();
        
        if (fruits[i].escaped || fruits[i].clicked()) {
            fruits.splice(i,1);
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
        this.bomb = false;
    }

    clicked(px, py){
        let d1 = dist(px, py, this.x, this.y);
        if (d1 < this.r){
            if (!this.bomb) {
                this.r = 0;
                score++;
            } else {
                this.r = 0;
                lives--;
            }
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

    // restart game
    if (!gameState) {
        gameState = true;
        lives = 3;
        score = 0;
        fruits = [];
        loop();
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
    gameState = false;

    noLoop();
  
    textAlign(CENTER);
    noStroke();
    fill("#999999");
    textSize(30);
    text("game over", width / 2, height / 2);
    textSize(10);
    text("Click to restart", width / 2, height / 2 + 30);
}