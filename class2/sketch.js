// variabili globali
let xMax = 400;
let yMax = 600;

let xrocket = xMax/2;
let yrocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax);
}

function draw() {
  background("#C0E1FC"); //blu chiaro
  //mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
  fill(255); //bianco
  text("mouseX: " + mouseX + ",mouseY: " + mouseY,20,20);

  //aprire contesto di disegno
  push();
  fill(150); //grigio
  stroke(40);
  rectMode(CENTER); //disegno il rettangolo dal centro
  rect(xrocket, yrocket+30, 80, 180, 20); //l'ultimo valore è il corner radius, smoothness
  //rettangolo

  //triangolo
  fill(200, 40, 40); //rosso
  triangle(xrocket-40, yrocket-60, xrocket+40, yrocket-60, xrocket, yrocket-120);

  //cerchio
  fill(40, 150, 220); //azzurro
  stroke(255);
  strokeWeight(3);
  ellipse(xrocket, yrocket+30, 48, 48);
  //finire il contesto
  pop();
}