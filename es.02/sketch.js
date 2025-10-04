// variabili globali
let xMax = 500;
let yMax = 830;

let xrect = xMax/2;
let yrect = yMax*0.8;

function setup() {
  createCanvas(xMax, yMax);
  frameRate(20);
}

function draw() {
  background("#14344eff"); //blu chiaro
  //mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
  fill(255); //bianco
  text("mouseX: " + mouseX + ", mouseY: " + mouseY, 20, 20);

  fill("#f5e35f");
  // Trapezio attaccato sopra al rettangolo
  // Rettangolo: rect(160, 400, 180, 50)
  // Base inferiore del trapezio: da 160 a 340 (larghezza 180, coincide con il rettangolo)
  // Base superiore più grande, da 120 a 380 (larghezza 260)
  // Aumento ancora la distanza verticale tra le basi: y superiore = 180
  quad(140, 200, 360, 200, 340, 400, 160, 400);

  fill("#422a11ff");
  rect(160, 400, 180, 70, 0, 0, 0, 0);

  fill("#ffffffff");
  rect(160, 400, 180, 30, 0, 0, 0, 0);

  fill("#000000ff");
  rect(160, 440, 40, 10);
  rect(300, 440, 40, 10);
  rect(220, 440, 60, 10);

  
  fill("#f5e35f");
  // Trapezio invertito: base piccola sopra, base grande sotto
  // Base superiore grande, base inferiore piccola
  // Trapezio invertito con asse verticale dritto
  // Vertici superiori centrati rispetto a quelli inferiori
  quad(200, 470, 220, 470, 200, 600, 220, 600);

  fill("#f5e35f");
  quad(280, 470, 300, 470, 280, 600, 300, 600);
  circle(210, 534, 10, 20);
  circle(290, 534, 10, 20);

  fill("#000000ff");
  rect(200, 600, 20, 25);

  fill("#000000ff");
  rect(280, 600, 20, 25);

  quad(200, 600, 200, 625, 200, 625, 180, 625);
  quad(300, 600, 300, 625, 300, 625, 320, 625);

  circle(182, 615, 20);
  // Cerchio specchiato rispetto a quello a sinistra (182, 615, 20)
  // Quello a sinistra è a (182, 615), quello a destra deve essere simmetrico rispetto al centro del rettangolo
  // Il rettangolo va da x=160 a x=340, centro x=250
  // Distanza dal centro: 250 - 182 = 68, quindi il cerchio specchiato sarà a 250 + 68 = 318
  circle(318, 615, 20);

  fill("#422a11ff");
  rect(190, 470, 40, 20);
  rect(270, 470, 40, 20);

  //cravatta
  fill("#ff0000ff");
  triangle(240, 400, 260, 400, 250, 420);
  fill("#ff0000ff");
  quad(250, 420, 260, 460, 250, 480, 240, 460);

  //occhi
  //pupille
  fill("#ffffffff");
  circle(210, 290, 50);
  circle(290, 290, 50);
  //iride
  fill("#009df8ff");
  circle(210, 295, 25);
  circle(290, 295, 25);
  //nero
  fill("#000000ff");
  circle(210, 295, 10);
  circle(290, 295, 10);

  //naso
  fill("#f5e35f");
  arc(250, 310, 15, 30, PI, 0);

  //ciglia
  stroke("#000000ff");
  strokeWeight(4);
  line(210, 250, 210, 263);
  line(180, 260, 190, 272);
  line(230, 272, 240, 263);


  line(290, 250, 290, 263);
  line(310, 272, 320, 263);
  line(260, 260, 270, 272);


  noStroke();
  
  
  //bocca
  noFill();
  stroke("#000000ff");
  strokeWeight(2);
  arc(250, 320, 80, 60, 0, PI); 

  //fossette
  fill("#f5e35f");
  arc(210, 320, 20, 20, PI, 0);
  arc(290, 320, 20, 20, PI, 0);

  //denti
  fill("#ffffffff");
  rect(238, 350, 10, 20);
  rect(252, 350, 10, 20);

  //braccia

  push();
  pop();

  }
