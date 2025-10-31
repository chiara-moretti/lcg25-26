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

