// Simple static rocket
let xMax = 400;
let yMax = 600;
let   xrocket = xMax/2;
let   yrocket = yMax*0.6;
function setup() {
  createCanvas(xMax, yMax); // create a 400x600 window
//   noLoop();               // only draw once (no animation needed)
}

function draw() {
  background(20, 24, 40); // dark blue background (like space)

  push();               // save current drawing settings
  // rocket body
  fill(220);            // light gray
  stroke(40);           // dark outline
  strokeWeight(2);
  rectMode(CENTER);     // rectangle drawn from its center
  rect(xrocket, yrocket+30, 80, 180, 20); // body rectangle with rounded corners

  // nose cone
  fill(200, 40, 40);    // red
  triangle(xrocket-40, yrocket-60, xrocket+40, yrocket-60, xrocket, yrocket-120); // triangle on top

  // window (circle)
  fill(40, 150, 220);   // blue glass
  stroke(255);          // white border
  strokeWeight(3);
  ellipse(xrocket, yrocket+20, 48, 48); // window circle

  // fins on the left and right
  stroke(40);
  strokeWeight(2);
  fill(180, 30, 30);    // dark red
  triangle(xrocket-40, yrocket+90, xrocket-80, yrocket+130, xrocket-20, yrocket+90); // left fin
  triangle(xrocket+40, yrocket+90, xrocket+80, yrocket+130, xrocket+20, yrocket+90);    // right fin

  pop(); // restore settings (so it won’t affect other drawings)
  push();
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
  pop();
  fill(255) //white text
  text(`mouseX: ${mouseX}, mouseY: ${mouseY}`, 20, 20);
  xrocket = (xrocket + 1) % (xMax +120);

}