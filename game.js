let d = 30;
let cnv;
function setup() {
    cnv = createCanvas(500,500);
    cnv.mouseOver(changeGray);
}

function draw() {
    background(51);

    ellipse(width / 2, height / 2, d, d);

}
function changeGray() {
    d = d + 10;
    if (d > 100) {
      d = 0;
    }
}