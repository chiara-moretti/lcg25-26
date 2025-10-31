/*
  sketch4.js
  - Grafici destri linea (Charlie) + tre istogrammi a tutta pagina per ciascun dataset.
  - Sezione istogrammi: per ogni dataset due pannelli
    (x_vel vs x_pos in alto, y_vel vs y_pos in basso) con linea dello zero.
  - Ridimensionamento responsive su windowResized.
*/
// p5 instance mode per grafico dataset 3 (drone_charlie: x_vel, y_vel)
const chartCharlie = (p) => {
  let table = null;
  let xVelocities = [];
  let yVelocities = [];
  let minV = 0;
  let maxV = 0;

  p.preload = () => {
    table = p.loadTable('dataset/drone_charlie_data.csv', 'csv', 'header');
  };

  p.setup = () => {
    const canvasWidth = p.windowWidth / 2 - 20;
    const canvasHeight = (p.windowHeight - 40) / 3;
    const c = p.createCanvas(canvasWidth, canvasHeight);
    c.parent('chart3');
    p.noFill();
    p.textFont('Helvetica');

    if (table) {
      const rows = table.getRowCount();
      xVelocities = new Array(rows);
      yVelocities = new Array(rows);
      for (let i = 0; i < rows; i++) {
        const r = table.getRow(i);
        const xv = parseFloat(r.get('x_vel'));
        const yv = parseFloat(r.get('y_vel'));
        xVelocities[i] = isNaN(xv) ? 0 : xv;
        yVelocities[i] = isNaN(yv) ? 0 : yv;
      }
      const allVals = xVelocities.concat(yVelocities);
      minV = Math.min.apply(null, allVals);
      maxV = Math.max.apply(null, allVals);
      if (minV === maxV) {
        minV -= 1;
        maxV += 1;
      }
    }
  };

  p.windowResized = () => {
    const canvasWidth = p.windowWidth / 2 - 20;
    const canvasHeight = (p.windowHeight - 40) / 3;
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.draw = () => {
    p.background(24);

    // margini grafico
    const margin = 50;
    const plotX = margin;
    const plotY = margin;
    const plotW = p.width - margin * 2;
    const plotH = p.height - margin * 2;

    // assi
    p.push();
    p.translate(plotX, p.height - margin);
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0); // asse X
    p.line(0, 0, 0, -plotH); // asse Y

    // griglia
    p.stroke(60);
    const gridXTicks = 10;
    const gridYTicks = 6;
    for (let i = 0; i <= gridXTicks; i++) {
      const x = (plotW / gridXTicks) * i;
      p.line(x, 0, x, -plotH);
    }
    for (let j = 0; j <= gridYTicks; j++) {
      const y = (plotH / gridYTicks) * j;
      p.line(0, -y, plotW, -y);
    }

    if (xVelocities.length > 1) {
      // funzione di mappatura
      const n = xVelocities.length;
      const xAt = (i) => p.map(i, 0, n - 1, 0, plotW);
      const yAt = (v) => -p.map(v, minV, maxV, 0, plotH);

      // zero line
      p.stroke(90);
      const zeroY = yAt(0);
      p.line(0, zeroY, plotW, zeroY);

      // x_vel (azzurro)
      p.stroke(100, 180, 255);
      p.strokeWeight(2);
      p.beginShape();
      for (let i = 0; i < n; i++) {
        p.vertex(xAt(i), yAt(xVelocities[i]));
      }
      p.endShape();

      // y_vel (viola)
      p.stroke(160, 120, 255);
      p.strokeWeight(2);
      p.beginShape();
      for (let i = 0; i < n; i++) {
        p.vertex(xAt(i), yAt(yVelocities[i]));
      }
      p.endShape();
    }

    p.pop();

    // legenda in alto
    p.push();
    p.noStroke();
    p.fill(220);
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.fill(100, 180, 255);
    p.rect(20, 16, 12, 12);
    p.fill(220);
    p.text('x_vel', 38, 12);
    p.fill(160, 120, 255);
    p.rect(90, 16, 12, 12);
    p.fill(220);
    p.text('y_vel', 108, 12);
    // titolo
    p.fill(160, 120, 255);
    p.text('Charlie', p.width - 80, 12);
    p.pop();
  };
};

new p5(chartCharlie);


// Istogramma x_vel e y_vel vs tempo (dataset ALFA)
const histogramAlpha = (p) => {
  let table = null;
  let xPos = [];
  let yPos = [];
  let xVel = [];
  let yVel = [];
  let minVX = 0, maxVX = 0;
  let minVY = 0, maxVY = 0;
  let minXP = 0, maxXP = 0;
  let minYP = 0, maxYP = 0;

  p.preload = () => {
    table = p.loadTable('dataset/drone_alfa_data.csv', 'csv', 'header');
  };

  p.setup = () => {
    const canvasWidth = p.windowWidth - 20; // piena larghezza
    const canvasHeight = 280;
    const c = p.createCanvas(canvasWidth, canvasHeight);
    c.parent('histogram');
    p.noStroke();
    p.textFont('Helvetica');

    if (table) {
      const rows = table.getRowCount();
      xPos = new Array(rows);
      yPos = new Array(rows);
      xVel = new Array(rows);
      yVel = new Array(rows);
      for (let i = 0; i < rows; i++) {
        const r = table.getRow(i);
        xPos[i] = parseFloat(r.get('x_pos'));
        yPos[i] = parseFloat(r.get('y_pos'));
        xVel[i] = parseFloat(r.get('x_vel')) || 0;
        yVel[i] = parseFloat(r.get('y_vel')) || 0;
      }
      // range posizioni
      minXP = Math.min.apply(null, xPos);
      maxXP = Math.max.apply(null, xPos);
      minYP = Math.min.apply(null, yPos);
      maxYP = Math.max.apply(null, yPos);
      if (minXP === maxXP) { minXP -= 1; maxXP += 1; }
      if (minYP === maxYP) { minYP -= 1; maxYP += 1; }
      // range velocità per ciascun pannello
      minVX = Math.min.apply(null, xVel);
      maxVX = Math.max.apply(null, xVel);
      minVY = Math.min.apply(null, yVel);
      maxVY = Math.max.apply(null, yVel);
      if (minVX === maxVX) { minVX -= 1; maxVX += 1; }
      if (minVY === maxVY) { minVY -= 1; maxVY += 1; }
    }
  };

  p.windowResized = () => {
    const canvasWidth = p.windowWidth - 20;
    const canvasHeight = 280;
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.draw = () => {
    p.background(24);

    const margin = 50;
    const plotW = p.width - margin * 2;
    const plotH = (p.height - margin * 3) / 2; // due pannelli, margine tra

    // Pannello superiore: x_vel vs x_pos
    p.push();
    p.translate(margin, margin + plotH); // origine in basso a sinistra del pannello
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0); // X
    p.line(0, 0, 0, -plotH); // Y
    if (xVel.length > 0) {
      const n = xVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (xp) => p.map(xp, minXP, maxXP, 0, plotW);
      const yAt = (v) => -p.map(v, minVX, maxVX, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(100, 180, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(xPos[i]) - barWidth / 2;
        const vh = yAt(xVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      // labels
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVX.toFixed(2), -6, yAt(maxVX));
      p.text('0', -6, zeroY);
      p.text(minVX.toFixed(2), -6, yAt(minVX));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('x_vel vs x_pos — Alfa', 0, -plotH - 8);
    }
    p.pop();

    // Pannello inferiore: y_vel vs y_pos
    p.push();
    p.translate(margin, margin * 2 + plotH * 2); // secondo pannello origin bottom-left
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0);
    p.line(0, 0, 0, -plotH);
    if (yVel.length > 0) {
      const n = yVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (yp) => p.map(yp, minYP, maxYP, 0, plotW);
      const yAt = (v) => -p.map(v, minVY, maxVY, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(160, 120, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(yPos[i]) - barWidth / 2;
        const vh = yAt(yVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVY.toFixed(2), -6, yAt(maxVY));
      p.text('0', -6, zeroY);
      p.text(minVY.toFixed(2), -6, yAt(minVY));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('y_vel vs y_pos — Alfa', 0, -plotH - 8);
    }
    p.pop();
  };
};

new p5(histogramAlpha);

// Istogramma x_vel e y_vel vs tempo (dataset BRAVO)
const histogramBravo = (p) => {
  let table = null;
  let xPos = [];
  let yPos = [];
  let xVel = [];
  let yVel = [];
  let minVX = 0, maxVX = 0;
  let minVY = 0, maxVY = 0;
  let minXP = 0, maxXP = 0;
  let minYP = 0, maxYP = 0;

  p.preload = () => {
    table = p.loadTable('dataset/drone_bravo_data.csv', 'csv', 'header');
  };

  p.setup = () => {
    const canvasWidth = p.windowWidth - 20;
    const canvasHeight = 280;
    const c = p.createCanvas(canvasWidth, canvasHeight);
    c.parent('histogram2');
    p.noStroke();
    p.textFont('Helvetica');

    if (table) {
      const rows = table.getRowCount();
      xPos = new Array(rows);
      yPos = new Array(rows);
      xVel = new Array(rows);
      yVel = new Array(rows);
      for (let i = 0; i < rows; i++) {
        const r = table.getRow(i);
        xPos[i] = parseFloat(r.get('x_pos'));
        yPos[i] = parseFloat(r.get('y_pos'));
        xVel[i] = parseFloat(r.get('x_vel')) || 0;
        yVel[i] = parseFloat(r.get('y_vel')) || 0;
      }
      minXP = Math.min.apply(null, xPos);
      maxXP = Math.max.apply(null, xPos);
      minYP = Math.min.apply(null, yPos);
      maxYP = Math.max.apply(null, yPos);
      if (minXP === maxXP) { minXP -= 1; maxXP += 1; }
      if (minYP === maxYP) { minYP -= 1; maxYP += 1; }
      minVX = Math.min.apply(null, xVel);
      maxVX = Math.max.apply(null, xVel);
      minVY = Math.min.apply(null, yVel);
      maxVY = Math.max.apply(null, yVel);
      if (minVX === maxVX) { minVX -= 1; maxVX += 1; }
      if (minVY === maxVY) { minVY -= 1; maxVY += 1; }
    }
  };

  p.windowResized = () => {
    const canvasWidth = p.windowWidth - 20;
    const canvasHeight = 280;
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.draw = () => {
    p.background(24);

    const margin = 50;
    const plotW = p.width - margin * 2;
    const plotH = (p.height - margin * 3) / 2;

    // x_vel vs x_pos (alto)
    p.push();
    p.translate(margin, margin + plotH);
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0);
    p.line(0, 0, 0, -plotH);
    if (xVel.length > 0) {
      const n = xVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (xp) => p.map(xp, minXP, maxXP, 0, plotW);
      const yAt = (v) => -p.map(v, minVX, maxVX, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(100, 180, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(xPos[i]) - barWidth / 2;
        const vh = yAt(xVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVX.toFixed(2), -6, yAt(maxVX));
      p.text('0', -6, zeroY);
      p.text(minVX.toFixed(2), -6, yAt(minVX));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('x_vel vs x_pos — Bravo', 0, -plotH - 8);
    }
    p.pop();

    // y_vel vs y_pos (basso)
    p.push();
    p.translate(margin, margin * 2 + plotH * 2);
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0);
    p.line(0, 0, 0, -plotH);
    if (yVel.length > 0) {
      const n = yVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (yp) => p.map(yp, minYP, maxYP, 0, plotW);
      const yAt = (v) => -p.map(v, minVY, maxVY, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(160, 120, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(yPos[i]) - barWidth / 2;
        const vh = yAt(yVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVY.toFixed(2), -6, yAt(maxVY));
      p.text('0', -6, zeroY);
      p.text(minVY.toFixed(2), -6, yAt(minVY));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('y_vel vs y_pos — Bravo', 0, -plotH - 8);
    }
    p.pop();
  };
};

new p5(histogramBravo);

// Istogramma x_vel e y_vel vs tempo (dataset CHARLIE)
const histogramCharlie = (p) => {
  let table = null;
  let xPos = [];
  let yPos = [];
  let xVel = [];
  let yVel = [];
  let minVX = 0, maxVX = 0;
  let minVY = 0, maxVY = 0;
  let minXP = 0, maxXP = 0;
  let minYP = 0, maxYP = 0;

  p.preload = () => {
    table = p.loadTable('dataset/drone_charlie_data.csv', 'csv', 'header');
  };

  p.setup = () => {
    const canvasWidth = p.windowWidth - 20;
    const canvasHeight = 280;
    const c = p.createCanvas(canvasWidth, canvasHeight);
    c.parent('histogram3');
    p.noStroke();
    p.textFont('Helvetica');

    if (table) {
      const rows = table.getRowCount();
      xPos = new Array(rows);
      yPos = new Array(rows);
      xVel = new Array(rows);
      yVel = new Array(rows);
      for (let i = 0; i < rows; i++) {
        const r = table.getRow(i);
        xPos[i] = parseFloat(r.get('x_pos'));
        yPos[i] = parseFloat(r.get('y_pos'));
        xVel[i] = parseFloat(r.get('x_vel')) || 0;
        yVel[i] = parseFloat(r.get('y_vel')) || 0;
      }
      minXP = Math.min.apply(null, xPos);
      maxXP = Math.max.apply(null, xPos);
      minYP = Math.min.apply(null, yPos);
      maxYP = Math.max.apply(null, yPos);
      if (minXP === maxXP) { minXP -= 1; maxXP += 1; }
      if (minYP === maxYP) { minYP -= 1; maxYP += 1; }
      minVX = Math.min.apply(null, xVel);
      maxVX = Math.max.apply(null, xVel);
      minVY = Math.min.apply(null, yVel);
      maxVY = Math.max.apply(null, yVel);
      if (minVX === maxVX) { minVX -= 1; maxVX += 1; }
      if (minVY === maxVY) { minVY -= 1; maxVY += 1; }
    }
  };

  p.windowResized = () => {
    const canvasWidth = p.windowWidth - 20;
    const canvasHeight = 280;
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.draw = () => {
    p.background(24);

    const margin = 50;
    const plotW = p.width - margin * 2;
    const plotH = (p.height - margin * 3) / 2;

    // x_vel vs x_pos (alto)
    p.push();
    p.translate(margin, margin + plotH);
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0);
    p.line(0, 0, 0, -plotH);
    if (xVel.length > 0) {
      const n = xVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (xp) => p.map(xp, minXP, maxXP, 0, plotW);
      const yAt = (v) => -p.map(v, minVX, maxVX, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(100, 180, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(xPos[i]) - barWidth / 2;
        const vh = yAt(xVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVX.toFixed(2), -6, yAt(maxVX));
      p.text('0', -6, zeroY);
      p.text(minVX.toFixed(2), -6, yAt(minVX));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('x_vel vs x_pos — Charlie', 0, -plotH - 8);
    }
    p.pop();

    // y_vel vs y_pos (basso)
    p.push();
    p.translate(margin, margin * 2 + plotH * 2);
    p.stroke(120);
    p.strokeWeight(1);
    p.line(0, 0, plotW, 0);
    p.line(0, 0, 0, -plotH);
    if (yVel.length > 0) {
      const n = yVel.length;
      const maxBars = 200;
      const step = Math.max(1, Math.floor(n / maxBars));
      const barWidth = Math.max(1, plotW / Math.min(n, maxBars) * 0.6);
      const xAt = (yp) => p.map(yp, minYP, maxYP, 0, plotW);
      const yAt = (v) => -p.map(v, minVY, maxVY, 0, plotH);
      const zeroY = yAt(0);
      p.stroke(90);
      p.line(0, zeroY, plotW, zeroY);
      p.noStroke();
      p.fill(160, 120, 255);
      for (let i = 0; i < n; i += step) {
        const xg = xAt(yPos[i]) - barWidth / 2;
        const vh = yAt(yVel[i]);
        const yb = Math.min(zeroY, vh);
        const h = Math.abs(vh - zeroY);
        p.rect(xg, yb, barWidth, h);
      }
      p.fill(180);
      p.textSize(10);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(maxVY.toFixed(2), -6, yAt(maxVY));
      p.text('0', -6, zeroY);
      p.text(minVY.toFixed(2), -6, yAt(minVY));
      p.textAlign(p.LEFT, p.BOTTOM);
      p.fill(200);
      p.text('y_vel vs y_pos — Charlie', 0, -plotH - 8);
    }
    p.pop();
  };
};

new p5(histogramCharlie);
