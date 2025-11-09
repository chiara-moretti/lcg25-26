let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  push();
  noStroke();

  for(let i=0; i < 120 ; i++){
    let starX = (i*37) % width + (i%3) * 5;
    let starY = ((i*73) % height) + (i%7);

    /*
    Vogliamo generare in maniera casuale la transparency
    e la size di ogni stella, usiamo quindi la funzione random
    random(min, max)
    Dopo aver generato i due valori li usiamo 
    quando eseguiamo le funzioni fill ed ellipse
    */

    let random_transparency = random(150, 255);
    let random_size = random(2.8, 5.8);


    if( i % 2 == 0){
      //stella tipo a
      fill(255,255,150, random_transparency); // Qui settiamo la trasparenza
      ellipse(starX,starY,random_size) // Qui invece settiamo la size random
    }else if( i % 3 == 0 ){
      //stella b
      fill(200, 100, 255, random_transparency);
      ellipse(starX, starY, random_size) 
    }else{
      //stella c
      fill(255,255,100, random_transparency);
      ellipse(starX,starY, random_size) 
    }
  }

  pop();

  push();
  
  fill(220);
  stroke(40);
  //alternativa
  rectMode(CENTER);
  rect(xRocket, yRocket+30, 80, 180,20);
  //
  // pop();
  //triangolo
  fill(200,40,40);
  triangle(xRocket-40, yRocket-60, xRocket+40,  
    yRocket-60, xRocket, yRocket-120);

  // cerchio
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket,yRocket+30,48,48);
  pop();

  xRocket = (xRocket +1) % xMax;
  yRocket = yRocket - 1;

  let soglia = - (yMax * 0.6);
  if(yRocket < soglia){
    yRocket = yMax;
  }
}
