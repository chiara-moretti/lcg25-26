let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}


// Function to draw a rocket at position (x, y) with scale s
function drawRocket(xRocket, yRocket, scl=1, angle=0) {
  push();               // save current drawing settings
  translate(xRocket, yRocket);      // move origin to rocket position
  scale(scl);             // scale rocket size if needed
  rotate(angle);          // rotate rocket if needed
  // rocket body
  fill(220);            // light gray
  stroke(40);           // dark outline
  strokeWeight(2);
  rectMode(CENTER);     // rectangle drawn from its center
  rect(0, 30, 80, 180, 20); // body rectangle with rounded corners

  // nose cone
  fill(200, 40, 40);    // red
  triangle(-40, -60, 40, -60, 0, -120); // triangle on top

  // window (circle)
  fill(40, 150, 220);   // blue glass
  stroke(255);          // white border
  strokeWeight(3);
  ellipse(0, 20, 48, 48); // window circle

  // fins on the left and right
  stroke(40);
  strokeWeight(2);
  fill(180, 30, 30);    // dark red
  triangle(-40, 90, -80, 130, -20, 90); // left fin
  triangle(40, 90, 80, 130, 20, 90);    // right fin

  pop(); // restore settings (so it won’t affect other drawings)
}

function moveRocket(yRocket, step=1) {

  yRocket = yRocket - step;
  let soglia = -(yMax * 0.6);
  if (yRocket < soglia) {
    yRocket = yMax;
  }
  return yRocket;
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);

  drawStarsFromFile();
  drawRocket(xRocket, yRocket, 0.75, 20); 

  xRocket = (xRocket +1) % xMax;
  yRocket = moveRocket(yRocket); 

}
