
function setup() {
  createCanvas(400, 600); // create a 400x600 window
}

function draw() {
  background(100); // dark blue background (like space)

  fill(255) //white text
  text(`mouseX: ${mouseX}, mouseY: ${mouseY}`, 20, 20);
  
  push();
  fill(220);            // light gray
  stroke(40);           // dark outline
  rectMode(CENTER);     // rectangle drawn from its center
  rect(100, 130, 80, 180);

  fill(200, 40, 40);    // red
  triangle(50, 475, 125, 375, 190, 450); // triangle on top
  // window (circle)
  fill(40, 150, 220);   // blue glass
  stroke(255);          // white border
  strokeWeight(3);
  ellipse(290, 240, 48, 48); // window circle
  pop();

}