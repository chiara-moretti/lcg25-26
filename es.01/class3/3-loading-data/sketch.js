let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;


let table;
let star_img;
let rocket_img;

function preload() {
  /*
  Per prima cosa dobbiamo definire la funzione preload, una funzione particolare di p5
  che viene eseguita prima di tutto. Qui possiamo caricare i file che dovremo poi
  usare all'interno del nostro sketch. Con loadTable possiamo caricare il file csv 
  contenente i dati che ci interessano, usiamo i due parametri opzionali "csv" e "header"
  per specificare il formato del file e il fatto che la prima riga del file contenga il nome 
  delle colonne, detto header. 
  Carichiamo anche le due icone e le salviamo nelle apposite variabili che abbiamo creato.
  */
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
  rocket_img = loadImage("rocket.png");
}



function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
}

/*
Vogliamo creare due funzioni che dovranno essenzialmente fare le stesse cose che fanno la funzione 
drawSingleStar e drawStars ma utilizzando l'icona che abbiamo caricato. 
Analogamente andremo a creare una funzione drawRocketFromFile che andrà a disegnare l'icona
del razzo precedentemente caricata nella posizione specificata
*/


function drawSingleStarFromFile(index, posX, posY) {
  /*
  La funzione che si occupa di disengare una singola stella deve ricevere come argomenti di input
  l'indice della riga che stiamo considerando e che quindi ci permetterà di caricare 
  il rispettivo valore di size dal file csv che abbiamo letto e poi la posizione (x,y) in cui 
  andare a stampare la stella

  Fatto questo usiamo getNum per prendere il valore di size dal csv e poi la funzione image() per
  effettivamente disegnare l'icona nella posizione desiderata. 
  */
  let starSize = table.getNum(index, "starSize")
  image(star_img, posX, posY, starSize, starSize);
}

function drawStarsFromFile() {
  /*
  La funzione drawStarsFromFile si occupa di iterare su tutte le righe del file e, per ogni iterazione,
  di invocare la funzione drawSingleStarFromFile facendo così in modo che venga disegnata una stella 
  per ogni riga del nostro dataset. 
  Da notare come la funzione getRowCount() restituisca il numero di righe del file csv. 
  */

  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);

    drawSingleStarFromFile(k, starX, starY);
  }

}

function drawRocketFromFile(xRocket, yRocket) {
  /*
  La funzione drawRocketFromFile prende in input semplicemente la posizione (x,y) del razzo 
  e utilizza poi la funzione image per stampare correttamente l'icona sullo schermo
  */
  image(rocket_img, xRocket, yRocket, 50, 50);
}


function drawSingleStar(i, starX, starY, random_transparency, random_size) {

  if ( i % 2 == 0){
    fill(0, 0, 0, random_transparency);
    ellipse(starX, starY, random_size) 
  }else if( i % 3 == 0 ){
    fill(200, 100, 255, random_transparency);
    ellipse(starX, starY, random_size) 
  }else{
    fill(255,255,100, random_transparency);
    ellipse(starX,starY, random_size) 
  }

  return;
}

function drawStars(num_stars=120) {

  push();
  noStroke();

  for(let i=0; i < num_stars; i++) {
    let starX = (i*37) % width + (i%3) * 5;
    let starY = (i*73) % height + (i%7);

    let random_transparency = random(150, 255);
    let random_size = random(6.8, 15.0) 

    drawSingleStar(i, starX, starY, random_transparency, random_size)
  }

  pop();
}

function drawRocket(xRocket, yRocket) {

  push();
  fill(220);
  stroke(40);
  // rettangolo
  rectMode(CENTER);
  rect(xRocket, yRocket+30, 80, 180,20);

  // triangolo
  fill(200,40,40);
  triangle(xRocket-40, yRocket-60, xRocket+40,  
    yRocket-60, xRocket, yRocket-120);

  // cerchio
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket,yRocket+30,48,48);
  pop();
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

  //drawStars(100); 
  // Possiamo commentare la chiamata alla funzione drawStars e sostituirla
  // con la chiamata alla funzione drawStarsFromFile 
  drawStarsFromFile();
  
  //drawRocket(xRocket, yRocket); 
  // Allo stesso modo possiamo commentare la funzione drawRocket e sostituirla
  // con la chiamata alla funzione drawRocketFromFile

  drawRocketFromFile(xRocket, yRocket)

  xRocket = (xRocket +1) % xMax;

  yRocket = moveRocket(yRocket); 

}
