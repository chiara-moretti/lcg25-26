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

  // mostrare un testo bianco che 
  //dice le coordinate del mouse
  //sul foglio da disegno
  fill(0); //bianco
  textSize(20);
  //stringa, x, y
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  //disegnare le stelle
  //120
  //tre tipi di stelle: a, b, c
  //fino a che abbiamo 120 stelle
  //stelle ellipse
  push();
  // 3 cicli

  //ciclo 1 specifica stella a, 40
  noStroke();
  // un unico ciclo
  // creare una sequenza x fare a, b, c
  for(let i=0; i < 120 ; i++){
    let starX = (i*37) % width + (i%3) * 5;
    let starY = ((i*73) % height) + (i%7);
    //operatore modulo %
    //stella a quando i è pari
    if ( i % 2 == 0){
      //stella tipo a
      fill(255,255,150);
      ellipse(starX,starY,1) //1
      //stelle tipo b 
      // ci saranno 
      //per ogni i che è divisibile per 3
    }else if( i % 3 == 0 ){
      //stella b
      fill(200, 100, 255);
      ellipse(starX, starY, 1.5) //1.5
    }else{
      //stella c
      fill(255,255,100);
      ellipse(starX,starY, 28) //2.8
    }

  }
  //ciclo 2 specifica stella b, 40
  //   for(let i=0; i < 40; i++){
  //   let starX = (i*37) % width + (i%3) * 5;
  //   let starY = ((i*73) % height) + (i%7);
  //   fill(200,100,255);
  //   ellipse(starX,starY,10);
  // }
  //ciclo 3 specifica stella c, 40

  pop();

  //aprire contesto di disegno
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
  //finire contesto
  pop();

  xRocket = (xRocket +1) % xMax;
  yRocket = yRocket - 1;
  //quando la yRocket sarà oltre una certa soglia
  let soglia = - (yMax * 0.6);
  if(yRocket < soglia){
    yRocket = yMax;
  }
  //allora resettare la yRocket
}
