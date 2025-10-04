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

  //cintura
  fill("#000000ff");
  rect(160, 440, 40, 10);
  rect(300, 440, 40, 10);
  rect(220, 440, 60, 10);

  fill("#f5e35f");
  // Gambe: rimpiazzo i quad con rect per poter arrotondare gli angoli superiori
  // le gambe vanno da y=470 a y=600 (altezza 130), larghezza 20
  rect(203, 470, 15, 130, 20, 20, 0, 0);
  rect(283, 470, 15, 130, 20, 20, 0, 0);
  
  //scarpe
  fill("#000000ff");
  rect(280, 600, 20, 25);
  rect(200, 600, 20, 25);

  quad(200, 601, 200, 620, 200, 620, 180, 625);
  quad(300, 601, 300, 620, 300, 620, 320, 625);
  circle(180, 615, 20);
  circle(320, 615, 20);

  //pantoloni
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
  fill("#f5e35f");
  // braccio sinistro: top y = 320, altezza 20
  quad(155, 350, 153, 325, 80, 240, 80, 260);
  quad(345, 350, 347, 325, 420, 240, 420, 260);

  //mani
  fill("#f5e35f");
  push();
  rotate(PI / -6);
  ellipse(-50, 265, 25, 40);
  pop();

  push();
  translate(500, 0);
  scale(-1, 1);
  rotate(PI / -6);
  ellipse(-50, 265, 25, 40);
  pop();  

}
