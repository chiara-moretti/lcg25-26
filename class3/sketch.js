let xMax = 400;
let yMax = 600;

let xRocket = xMax/2
let yRocket = yMax*0.6;

//genero le variabili per preload
let table;
let star_img;
let rocket_img;

function preload() {
  // funzione che viene eseguita prima di setup() specifica di p5 che serve per caricare tutti i dati
  // load images, fonts, sounds
  // punto dove carichiamo tutti i dati esterni
  // load table funzione che prende file csv e return una tabella
  table = loadTable("stars.csv", "csv", "header");
  // i parametri sono: nome file, tipo di file, se ha intestazioni
  star_img = loadImage("star.png");
  // loadImage funzione che prende il file immagine e return un oggetto immagine
  rocket_img = loadImage("rocket.png");
}

function setup() {
  createCanvas(400, 600);
  frameRate(5)
}

function drawRocketFromFile(xRocket, yRocket) {
  image(rocket_img, xRocket, yRocket, 80, 80);
}


function drawSingleStarFromFile(index, posX, posY) {
  // disegno le stelle a partire dai dati del file csv
  // vogliamo ottenere la star size dalla tabella
  let starSize = table.getNum(index, "starSize");
  // get num ritorna il valore numerico della cella alla riga index e colonna "size"
  image(star_img, posX, posY, starSize, starSize);
  // altezza e larghezza sono uguali a starSize perché uguali al contenuto del dataset
}

function drawStarsFromFile() {
  for (let k = 0; k < table.getRowCount(); k++) {
    // getRowCount ritorna il numero di righe della tabella
    let starX = (k*37) % width + (k%3)*5;
    let starY = (k*73) % height + (k%7);

    drawSingleStarFromFile(k, starX, starY);
  }
}


function drawSingleStar (i, starX, starY, random_transparency, random_size) {
  if( i % 2 == 0 ){
    //stella tipo a
  fill(255,255,150, random_transparency);
  ellipse (starX,starY,random_size) //1
  } else if (i % 3 == 0) {
    //stella b
  fill(200,100,150, random_transparency);
  ellipse (starX,starY,random_size)
  } else {
    // stella c
  fill(255,255,150, random_transparency);
  ellipse (starX,starY,random_size) //2.8
  }
}

function drawStars (num_stars=120) {
  for (let i=0; i<num_stars; i++) {
    let starX = (i*37) % width + (i%3) * 5;
    let starY = (i*73) % height + (i%7);

    let random_transparency = random(150, 255);
    let random_size = random(6.8,15);
    
    drawSingleStar(i, starX, starY, random_transparency, random_size);

  }
}

function drawRocket (xRocket, yRocket) {
    // rettangolo
    fill(220);
    stroke(40);
    // alternativa
    rectMode(CENTER);
    rect(xRocket,yRocket+30,80,180,20); // ultimo parametro determinana l'arrotondamento

    // triangolo
    fill(200,40,40);
    triangle(xRocket-40,yRocket-60,xRocket+40,
      yRocket-60, xRocket,yRocket-120);

    // cerchio
    fill(40,150,220);
    stroke(255);
    strokeWeight(3);
    ellipse(xRocket,yRocket+30,48,48);
}

function moveRocket (xRocket, yRocket, step) {
  
  yRocket = yRocket - step;
  let soglia = - (yMax * 0.6);
  if (yRocket < soglia){
    yRocket = yMax;
  }
    return yRocket;
}

function draw() {
  background("#c5c5d7ff");

  // mostrare un testo bianco 
  // che dice le coordinate del mouse 
  // sul foglio da disegno 
  push();
  
  //*
  fill(255); // bianco 
  // stringa, x, y
  text("mouseX: "+ mouseX + ", mouseY: " + mouseY,20, 20);
  pop();
 
  // disegnare le stelle 
  // 120 
  // tre tipi di stelle: a, b, c
  // fino a che abbiano 120 stelle
  push();
  noStroke ();
  //drawStars (120);
  pop ();
  //*

  // contesto di disegno (per isolare)
  push();
  //drawRocket(xRocket, yRocket);
  // finire contesto di diesgno 
  drawStarsFromFile();
  drawRocketFromFile(xRocket, yRocket);
  pop();

  yRocket = moveRocket(xRocket, yRocket, 3)

  }