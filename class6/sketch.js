let rotXSlider, rotYSlider, rotZSlider;
let autoRotateCheckbox, speedSlider;
let tableAlfa, tableBravo, tableCharlie;
let dataPoints = [];
let dataPointsBravo = [];
let dataPointsCharlie = [];
let scaleFactor = 200; // Fattore di scala maggiore per punti più grandi
let axisLength = 500; // Assi ancora più lunghi per un piano più grande
 
 

function preload() {
  // Carica il dataset del drone alfa
  tableAlfa = loadTable('dataset/drone_alfa_data.csv', 'csv', 'header');
  // Carica anche i dataset dei droni bravo e charlie
  tableBravo = loadTable('dataset/drone_bravo_data.csv', 'csv', 'header');
  tableCharlie = loadTable('dataset/drone_charlie_data.csv', 'csv', 'header');
}

function setup() {
  // Calcola le dimensioni del canvas basandosi sul container
  const container = document.getElementById('viewport-container');
  const containerWidth = container.clientWidth - 20; // sottrai padding
  const containerHeight = container.clientHeight;
  
  // Riserva spazio per legenda, caption e controlli (stimato ~200px)
  const reservedSpace = 250;
  const availableHeight = containerHeight - reservedSpace;
  
  // Il canvas occupa tutta la larghezza disponibile e si adatta all'altezza
  const canvasWidth = containerWidth;
  const canvasHeight = availableHeight;
  
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent('viewport');
  angleMode(DEGREES);
  noStroke();

  // Legend (in alto, prima del canvas) - inserita all'inizio del container
  const viewportDiv = document.getElementById('viewport');
  const legend = createDiv();
  legend.id('legend-container');
  legend.style('display', 'flex');
  legend.style('gap', '16px');
  legend.style('align-items', 'center');
  legend.style('justify-content', 'center');
  legend.style('padding', '10px 0');
  legend.style('width', '100%');
  legend.style('flex-shrink', '0');
  // Inserisce la legenda prima del viewport
  container.insertBefore(legend.elt, viewportDiv);

  // Caption descrittiva sotto al grafico 3D
  const caption = createP('Questo grafico 3D rappresenta le coordinate (x, y, z) dei droni.');
  caption.parent('viewport-container');
  caption.style('margin', '6px 0 2px 0');
  caption.style('font-size', '14px');
  caption.style('color', '#cfcfcf');
  caption.style('flex-shrink', '0');

  function addLegendItem(rgb, label) {
    const item = createDiv();
    item.parent(legend);
    item.style('display', 'flex');
    item.style('align-items', 'center');
    item.style('gap', '6px');

    const dot = createSpan('\u25CF');
    dot.parent(item);
    dot.style('color', rgb);
    dot.style('font-size', '16px');

    const text = createSpan(label);
    text.parent(item);
  }

  addLegendItem('rgb(255,100,100)', 'Alfa');
  addLegendItem('rgb(100,180,255)', 'Bravo');
  addLegendItem('rgb(160,120,255)', 'Charlie');

  // Controls container
  const controls = createDiv();
  controls.parent('viewport-container');
  controls.style('display', 'grid');
  controls.style('grid-template-columns', 'auto 1fr');
  controls.style('gap', '8px 12px');
  controls.style('width', '100%');
  controls.style('flex-shrink', '0');

  // Rotation sliders
  createSpan('Rotazione X (°)').parent(controls);
  rotXSlider = createSlider(-180, 180, 30, 1);
  rotXSlider.parent(controls);
  rotXSlider.style('width', '100%');

  createSpan('Rotazione Y (°)').parent(controls);
  rotYSlider = createSlider(-180, 180, -30, 1);
  rotYSlider.parent(controls);
  rotYSlider.style('width', '100%');

  createSpan('Rotazione Z (°)').parent(controls);
  rotZSlider = createSlider(-180, 180, 0, 1);
  rotZSlider.parent(controls);
  rotZSlider.style('width', '100%');

  createSpan('Auto-rotazione').parent(controls);
  autoRotateCheckbox = createCheckbox('', true);
  autoRotateCheckbox.parent(controls);

  createSpan('Velocità auto-rotazione').parent(controls);
  speedSlider = createSlider(0, 3, 1, 0.1);
  speedSlider.parent(controls);
  speedSlider.style('width', '100%');

  // Carica e prepara i dati per i tre dataset
  if (tableAlfa) {
    const rowCount = tableAlfa.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const row = tableAlfa.getRow(i);
      const x = parseFloat(row.get('x_pos'));
      const y = parseFloat(row.get('y_pos'));
      const z = parseFloat(row.get('z_pos'));
      const steps = row.get('steps');
      const timestamp = row.get('timestamp');
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        dataPoints.push({
          x: x * scaleFactor,
          y: y * scaleFactor,
          z: z * scaleFactor,
          steps: steps,
          timestamp: timestamp
        });
      }
    }
    console.log(`Caricati ${dataPoints.length} punti da drone_alfa`);
  }

  if (tableBravo) {
    const rowCountB = tableBravo.getRowCount();
    for (let i = 0; i < rowCountB; i++) {
      const row = tableBravo.getRow(i);
      const x = parseFloat(row.get('x_pos'));
      const y = parseFloat(row.get('y_pos'));
      const z = parseFloat(row.get('z_pos'));
      const steps = row.get('steps');
      const timestamp = row.get('timestamp');
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        dataPointsBravo.push({
          x: x * scaleFactor,
          y: y * scaleFactor,
          z: z * scaleFactor,
          steps: steps,
          timestamp: timestamp
        });
      }
    }
    console.log(`Caricati ${dataPointsBravo.length} punti da drone_bravo`);
  }

  if (tableCharlie) {
    const rowCountC = tableCharlie.getRowCount();
    for (let i = 0; i < rowCountC; i++) {
      const row = tableCharlie.getRow(i);
      const x = parseFloat(row.get('x_pos'));
      const y = parseFloat(row.get('y_pos'));
      const z = parseFloat(row.get('z_pos'));
      const steps = row.get('steps');
      const timestamp = row.get('timestamp');
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        dataPointsCharlie.push({
          x: x * scaleFactor,
          y: y * scaleFactor,
          z: z * scaleFactor,
          steps: steps,
          timestamp: timestamp
        });
      }
    }
    console.log(`Caricati ${dataPointsCharlie.length} punti da drone_charlie`);
  }
}

function windowResized() {
  // Ricalcola le dimensioni quando la finestra viene ridimensionata
  const container = document.getElementById('viewport-container');
  const containerWidth = container.clientWidth - 20; // sottrai padding
  const containerHeight = container.clientHeight;
  
  // Riserva spazio per legenda, caption e controlli
  const reservedSpace = 250;
  const availableHeight = containerHeight - reservedSpace;
  
  const canvasWidth = containerWidth;
  const canvasHeight = availableHeight;
  
  resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(24);
  orbitControl(2, 2, 0.2); // opzionale: drag per esplorare

  // Luci morbide
  ambientLight(180);
  directionalLight(255, 255, 255, 0.5, 1, -0.3);

  // Rotazioni scene
  let rx = rotXSlider.value();
  let ry = rotYSlider.value();
  let rz = rotZSlider.value();
  if (autoRotateCheckbox.checked()) {
    const t = frameCount * Math.max(0.05, speedSlider.value());
    ry += t * 0.3; // rotazione continua su Y
  }
  rotateX(rx);
  rotateY(ry);
  rotateZ(rz);

  drawAxesAndGrids(axisLength);
  drawDataPoints();
}

function drawDataPoints() {
  // Disegna tutti i punti
  push();
  stroke(255, 100, 100, 220); // alfa
  strokeWeight(5);
  beginShape(POINTS);
  for (let i = 0; i < dataPoints.length; i++) {
    const pt = dataPoints[i];
    vertex(pt.x, pt.y, pt.z);
  }
  endShape();
  pop();

  // Bravo - colore differente
  push();
  stroke(100, 180, 255, 220);
  strokeWeight(5);
  beginShape(POINTS);
  for (let i = 0; i < dataPointsBravo.length; i++) {
    const pt = dataPointsBravo[i];
    vertex(pt.x, pt.y, pt.z);
  }
  endShape();
  pop();

  // Charlie - altro colore
  push();
  stroke(160, 120, 255, 220);
  strokeWeight(5);
  beginShape(POINTS);
  for (let i = 0; i < dataPointsCharlie.length; i++) {
    const pt = dataPointsCharlie[i];
    vertex(pt.x, pt.y, pt.z);
  }
  endShape();
  pop();
}

 

function drawAxesAndGrids(axisLength) {
  const gridStep = 20;
  const half = axisLength;

  // Griglie semitrasparenti sui tre piani (XY, YZ, ZX)
  push();
  strokeWeight(1);

  // Piano XY
  push();
  rotateX(90); // allineo per usare plane()
  fill(200, 200, 200, 35);
  noStroke();
  plane(half * 2, half * 2);
  pop();

  // Piano YZ (ruoto per allineare)
  push();
  rotateY(90);
  fill(200, 200, 200, 25);
  noStroke();
  plane(half * 2, half * 2);
  pop();

  // Piano ZX
  push();
  // già nel piano di base, ma uso una rotazione leggera per consistenza visiva
  fill(200, 200, 200, 20);
  noStroke();
  rotateZ(0);
  plane(half * 2, half * 2);
  pop();

  // Griglie lineari (linee)
  stroke(190);
  for (let s = -half; s <= half; s += gridStep) {
    // XY lines (parallele a X e Y)
    line(-half, s, 0, half, s, 0);
    line(s, -half, 0, s, half, 0);

    // YZ lines
    line(0, -half, s, 0, half, s);
    line(0, s, -half, 0, s, half);

    // ZX lines
    line(-half, 0, s, half, 0, s);
    line(s, 0, -half, s, 0, half);
  }
  pop();

  // Assi con colori standard: X=rosso, Y=verde, Z=blu
  const axisThickness = 3;
  strokeWeight(axisThickness);

  // Asse X
  stroke(220, 60, 60);
  line(-half, 0, 0, half, 0, 0);
  drawArrowHead(createVector(half, 0, 0), createVector(1, 0, 0), color(220, 60, 60));

  // Asse Y
  stroke(60, 180, 90);
  line(0, -half, 0, 0, half, 0);
  drawArrowHead(createVector(0, half, 0), createVector(0, 1, 0), color(60, 180, 90));

  // Asse Z
  stroke(60, 90, 220);
  line(0, 0, -half, 0, 0, half);
  drawArrowHead(createVector(0, 0, half), createVector(0, 0, 1), color(60, 90, 220));

  // Tacche sugli assi
  stroke(120);
  strokeWeight(1);
  const tickSize = 6;
  for (let s = -half; s <= half; s += gridStep) {
    // X ticks
    line(s, -tickSize, 0, s, tickSize, 0);
    // Y ticks
    line(-tickSize, s, 0, tickSize, s, 0);
    // Z ticks
    line(0, -tickSize, s, 0, tickSize, s);
  }

  // (Etichette rimosse per ripristinare il comportamento precedente)
}

function drawArrowHead(endpoint, direction, col) {
  push();
  translate(endpoint.x, endpoint.y, endpoint.z);
  const size = 10;
  const dir = direction.copy().normalize();

  // Orient the cone to the axis direction
  // X axis
  if (abs(dir.x) > 0.9) {
    rotateZ(90 * (dir.x > 0 ? 1 : -1));
  }
  // Y axis
  else if (abs(dir.y) > 0.9) {
    // default cone points +Z, rotate to +Y/-Y
    rotateX(90 * (dir.y > 0 ? -1 : 1));
  }
  // Z axis (already aligned to +Z by default)

  noStroke();
  fill(col);
  cone(size * 0.6, size * 1.2, 12, 1);
  pop();
}
