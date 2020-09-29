let score;
let lives;
let fruits = [];
let gameState = false;
let interval;
let frozen = false;

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
    displayScore();
    speedUp();
    freezeTime();
    if (lives < 1) {
        endGame();
    }
}

function displayScore(){
    textAlign(LEFT);
    noStroke();
    fill("#ffffff");
    textSize(15);
    text('Score: ' + score.toString(), 10, 20);
    noStroke();
    fill("#ffffff");
    textSize(15);
    text('Lives: ' + lives.toString(), width-60, 20);
}

function drawSlice(){
    stroke(126);
    strokeWeight(3);
    fill(100);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function speedUp(){
    if (frameCount % 50 === 0){
        interval--;
    }
}

function freezeTime(){
    frozen = true;
    let timer = 5;
    // count down 5 seconds
    if (frameCount % 60 === 0 && timer > 0) {
        timer --;
    }
    if (timer == 0) {
        // resume game
        frozen = false;
    }
}

function drawFruit(){

    // push out fruits and bomb at intervals
    if (frameCount % interval === 0) {
        let x = random(width);
        let y = height;
        let r = random(10,30);
        let c = color(random(100,255), random(100,255), random(100,255));
        let f = new Fruit(x, y, r, c);
        if (frameCount % 35 === 0) {
            f.bomb = true;
            f.c = color(255, 0, 0);
        } 
        if (frameCount % 30 === 0) {
            f.timeFreezer = true;
            f.c = color(247, 255, 0);
        }
        fruits.push(f);
    }

    // display and move fruits
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].show();
        fruits[i].move();
        
        // remove out of view fruits from array
        if (fruits[i].escaped || fruits[i].sliced()) {
            fruits.splice(i,1);
        }
    }
}

function randomVeloX(x) {
    if (x > width / 2) {
        return random(-4, -0.5);
    } else {
        return random(0.5, 4);
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
        this.timeFreezer = false;
    }

    sliced(px, py){
        let d1 = dist(px, py, this.x, this.y);

        if (d1 < this.r) {

            if (this.bomb) { // BOMB
                this.r = 0;
                background(251,255,111);
                lives--;

            } else if (this.timeFreezer) { // TIME FREEZE
                this.r = 0;
                background(200);
                console.log('FREEZE TIME');

            } else { // FRUIT
                this.r = 0;
                score++;
            }

        }
    }

    move(){
        this.veloX *= 0.99; // air resistance
        this.veloY += 0.6; // gravity
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

function touchMoved(){
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].sliced(mouseX, mouseY);
    }
}

function mouseDragged(){
    for (let i = 0; i < fruits.length; i++) {
        fruits[i].sliced(mouseX, mouseY);
    }
}

function mousePressed() {
    // restart the game
    if (!gameState) {
        gameState = true;
        lives = 3;
        score = 0;
        fruits = [];
        interval = 30;
        loop();
    }
}

function endGame() {
    gameState = false;

    noLoop();
  
    textAlign(CENTER);
    noStroke();
    fill("#999999");
    textSize(30);
    text("game over :(", width / 2, height / 2);
    textSize(15);
    text("Click to restart", width / 2, height / 2 + 30);
}