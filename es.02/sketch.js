// variabili globali
let xMax = 400;
let yMax = 600;

let xrocket = xMax/2;
let yrocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax);
  frameRate(20);
}

function draw() {
  background("#14344eff"); //blu chiaro
  //mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
  fill(255); //bianco
  text("mouseX: " + mouseX + "mouseY: " + mouseY,20,20);

    push();
  //3 cicli
  push();
  // 3 cicli

  noStroke()
  // unico ciclo
  // creare una sequenza x fare a, b, c
  for(let i=0;i < 120; i++){
    let starX = random(width);
    let starY = random(height);
    // operatore modulo %
    // stella a quando i è pari
    if( i % 2 == 0 ){
      //stella tipo a
    fill(255,255,150);
    ellipse(starX,starY,1); //1
    } else if (i % 3 == 40) {
      //stella b
      fill(200, 100, 25);
      ellipse(starX,starY,1.5); //1.5
    } else {
      // stella c
      fill(255,255,100);
      ellipse(starX,starY, 2.8); //2.8
    }

    }

  push();
  // 3 cicli

  

  noStroke()
  // unico ciclo
  // creare una sequenza x fare a, b, c
  for(let i=0;i < 120; i++){
    let starX = (i*37) % width + (i%3) * 5;
    let starY = ((i*73) % height) + (i%7);
    // operatore modulo %
    // stella a quando i è pari
    if( i % 2 == 0 ){
      //stella tipo a
    fill(255,255,150);
    ellipse(starX,starY,1); //1
    } else if (i % 3 == 0) {
      //stella b
      fill(200, 100, 25);
      ellipse(starX,starY,1.5); //1.5
    } else {
      // stella c
      fill(255,255,100);
      ellipse(starX,starY, 2.8); //2.8
    }

    }

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
  
  frameRate(20);
  yrocket = (yrocket - 1);
   //wuando la yrocket sarà soprà una certa soglia, la faccio ricomparire in basso
   let soglia = yMax*0.6;
   if (yrocket < soglia) {
    yrocket = yMax;
   }

  pop();

  pop();
}
