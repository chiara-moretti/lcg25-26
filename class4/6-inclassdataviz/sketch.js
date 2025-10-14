let xMax = 400;
let yMax = 600;

let table;
let star_img;
let tempo = 0;
let stars_valid = []
// in questo modo definisco come array le righe

function isStarSizeValid(value){
  // ci dice se il dato d'ingresso è corretto o meno
  // 1) dobbiamo avere un valore d'ingresso (la funzione deve avere un parametro)
  // 2) vogliamo sapere ritornare, restituire un valore corretto di una variabile booleana
  // dobbiamo capire quali sono le regole
  return value > 0;
}

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(2);
  // vogliamo filtrare i dati in setup, in setup perché così lo facciamo una volta sola
  // tramite la funzione isStarSizeValid

  // applichiamo la funzione di filtro
  // scorriamo i valori con un ciclo e controlliamo se sono validi, filtrandoli
  // li filtro usando la funzione e poi uso i comandi per eliminare le righe non valide
  // sennò creiamo una variabile (array) di supporto dove salviamo queste cose
  // usare una struttura di supporto 
  for(let i=0; i < table.getRowCount(); i++){
    let star_value =  table.getNum(i, "starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
      //aggiunge in coda il nuovo valore che abbiamo trovato

    }
  }
}


//prende i dati dal file csv e disegna le stelle
function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
//altezza e ampiezza dell'immagine dipendono da una variabile (starSize) presa dal file csv --> file esterni preso come una tabella
  }
}


function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
    //stars_valid
    image(star_img, 50, 50, min(stars_valid), min(stars_valid));
    image(star_img, 50, 50, max(stars_valid), max(stars_valid));

  drawStarsFromFile();


}