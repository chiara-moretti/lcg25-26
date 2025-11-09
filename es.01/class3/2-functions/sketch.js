let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
}

/*
Vogliamo creare due funzioni, la prima si occuperà di disegnare una singola stella mentre la 
seconda avrà lo scopo di iterare un numero di volte pari al numero di stelle che vogliamo 
disegnare e di chiamare quindi la prima funzione
*/

function drawSingleStar(i, starX, starY, random_transparency, random_size) {
  /*
  La funzione che si occupa di disegnare una singola stella ha bisogno dei seguenti parametri
  - indice della stella per decidere se è una stella di primo, secondo o terzo tipo
  - la posizione x della stella
  - la posizione y della stella
  - la trasparenza con cui disegnare la stella
  - la dimensione della stella

  Una volta passati questi parametri alla funzione dobbiamo solo eseguire il codice che avevamo 
  precedentemente scritto per disegnare la stella e che avevamo inizialmente inserito nella funzione
  draw()
  */

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
  /*
  La funzione che disegna tutte le stelle ha bisogno di un singolo parametro 
  che indicherà il numero di stelle che vogliamo disegnare. In questo caso vogliamo fornire
  un valore di default al parametro per fare in modo che non sia obbligatorio specificare quante 
  stelle disegnare. Scrivendo (num_stars=120) nella definizione della funzione specifichiamo 
  che il parametro accettato dalla funzione drawStars ha un valore di default pari a 120.

  Il rimamente corpo della funzione è un semplice ciclo for in cui per un numero di volte pari 
  a num_stars generiamo una coppia di valori (x,y), una trasparenza e una dimensione e poi usiamo
  la funzione drawSingleStar che avevamo precedentemente scritto.
  */
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
  /*
  La funzione drawRocket necessita come parametri le posizioni x e y in cui andare a disegnare 
  il razzo. Fatto questo bisogna solo eseguire il codice che disegna il rettangolo, il triangolo 
  e il cerchio che compongono il nostro razzo.
  */

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
  /*
  La funzione che si occupa di muovere il razzo riceve come parametri la posizione 
  in y del razzo e un parametro detto step ovvero di quanto muovere il razzo. Questo 
  ci permette di controllare la velocità di movimento. 
  Al termine della funzione dobbiamo stare attenti a restituire il valore aggiornato 
  di yRocket per fare in modo che possa essere correttamente aggiornato nella funzione principale
  */

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



  /* 
  Possiamo quindi commentare (e rimuovere) il pezzo di codice che originariamente
  si occupava di disegnare le stelle in quanto ora abbiamo modo di utilizzare la funzione 
  drawStars() appena scritta. 
  */

  drawStars(100); // cosi' facendo la funzione drawStars si occuperà di disengare 100 stelle
  

  /* 
  push();
  noStroke();
  
  for(let i=0; i < 120 ; i++){
    let starX = (i*37) % width + (i%3) * 5;
    let starY = ((i*73) % height) + (i%7);

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
    
  */

  /* 
  Analogamente a come abbiamo fatto per le stelle possiamo rimuovere il codice che si occupa 
  di disengare il razzo in quanto è ormai necessario solo utilizzare la funzione apposita
  */

  drawRocket(xRocket, yRocket);

  /* push();
  
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
  pop(); */

  xRocket = (xRocket +1) % xMax;
  /* 
  Dato che abbiamo scritto la funzione che aggiorna la posizione in y del razzo possiamo 
  commentare e rimuovere la parte di codice che si occupa della stessa funzionalità e sostituirla 
  con la chiamata alla funzione 
  */

  yRocket = moveRocket(yRocket); // bisogna ricordarsi di assegnare il valore di ritorno della funzione alla variabile yRocket
  /* yRocket = yRocket - 1;

  let soglia = - (yMax * 0.6);
  if(yRocket < soglia){
    yRocket = yMax;
  } */
}
