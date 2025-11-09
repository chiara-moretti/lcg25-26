// Simple static rocket
let xMax = 400;
let yMax = 600;
let   xrocket = xMax/2;
let   yrocket = yMax*0.6;
function setup() {
  createCanvas(xMax, yMax); // create a 400x600 window
  // noLoop();               // only draw once (no animation needed)
  angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(20, 24, 40); // dark blue background (like space)
  // drawStarsLoopConditions();
  drawStarsRandom();
  // drawRocket(xrocket, yrocket, 1, 0); // draw rocket at center
  drawRocket(xrocket, yrocket, 0.5, 75); // draw rocket at center
  //displays the x and y position of the mouse on the canvas
  fill(255) //white text
  text(`mouseX: ${mouseX}, mouseY: ${mouseY}`, 20, 20);
  //animation of the rocket
  xrocket = (xrocket + 1) % (xMax +120);
}

// Function to draw a rocket at position (x, y) with scale s
function drawRocket(x, y, scl=1, angle=0) {
  push();               // save current drawing settings
  translate(x, y);      // move origin to rocket position
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

function drawStarsLoopConditions() {
  // simple starfield
  noStroke();
  for (let i = 0; i < 120; i++) {
    let sx = (i*37) % width + (i%3)*5;
    let sy = ((i*73) % height) + (i%7);
    //transparency 200 or 255, change of color
    if(i%2 == 0){
        fill(255, 255, 150);
      ellipse(sx, sy, 1);
    }else if (i%3==0){
        fill(200, 100, 255);
        ellipse(sx, sy, 1.5);
    }else{
        fill(255, 255, 100);
        ellipse(sx, sy, 2.8);

    }
  }
}

function drawStarsRandom() {
  // simple starfield
  randomSeed(99); // keep stars stable
  noStroke();
  for (let i = 0; i < 120; i++) {
    let sx = (i*37) % width + (i%3)*5;
    let sy = ((i*73) % height) + (i%7);
    //random transparency between 150 and 255
    fill(255, 255, 255, random(150, 255));
    //Draws a small circle at (sx, sy)
    //Diameter is random between 1 and 2.8 pixels
    ellipse(sx, sy, random(1, 2.8));
  }
}
