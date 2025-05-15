let laser, beamSplitter, mirrors = [], objectCube, screenPlane;
let particles = [];
let selectedMirror = null;
let wavelength = 0.01;
let aaarghFont;
let canvas;

function preload() {
  aaarghFont = loadFont("Aaargh.ttf");
}

function setup() {
  canvas = createCanvas(800, 450, WEBGL);
  canvas.parent('simulation-window');
  
  textFont(aaarghFont);
  textSize(14);
  textAlign(CENTER);
  
  laser = new Laser();
  beamSplitter = new BeamSplitter(createVector(-300, 0, 0));
  mirrors.push(new Mirror(createVector(0, -150, 0), createVector(1, 1, 0).normalize()));
  mirrors.push(new Mirror(createVector(0, 150, 0), createVector(-1, 1, 0).normalize()));
  objectCube = new ObjectCube(createVector(150, 50, 0));
  screenPlane = new Screen(createVector(300, 0, 0));

  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }

  // Setup wavelength slider
  const slider = document.getElementById('wavelength-slider');
  const valueDisplay = document.getElementById('wavelength-value');
  
  slider.addEventListener('input', function() {
    wavelength = parseFloat(this.value);
    valueDisplay.textContent = wavelength.toFixed(3);
  });
}

function draw() {
  background(0);
  orbitControl();
  
  ambientLight(30);
  directionalLight(255, 255, 255, 0, 0, -1);

  laser.display();
  beamSplitter.display();
  for (let mirror of mirrors) mirror.display();
  objectCube.display();
  screenPlane.display();

  // Reference Beam
  drawBeam(laser.pos, beamSplitter.pos, 1.0, "Laser Beam");
  drawBeam(beamSplitter.pos, mirrors[0].pos, 0.8, "Reference Beam");
  let ref = reflectBeam(beamSplitter.pos, mirrors[0].pos, mirrors[0]);
  drawBeam(mirrors[0].pos, ref.reflectPoint, 0.6);

  // Object Beam
  drawBeam(beamSplitter.pos, mirrors[1].pos, 0.8, "Object Beam");
  let obj = reflectBeam(beamSplitter.pos, mirrors[1].pos, mirrors[1]);
  drawBeam(mirrors[1].pos, obj.reflectPoint, 0.6);

  for (let p of particles) p.update();

  // Labels
  labelAt(laser.pos, "Laser");
  labelAt(beamSplitter.pos, "Beam Splitter");
  labelAt(mirrors[0].pos, "Mirror (Ref)");
  labelAt(mirrors[1].pos, "Mirror (Obj)");
  labelAt(objectCube.pos, "Object");
  labelAt(screenPlane.pos, "Screen");
}

function drawBeam(from, to, intensity, label = "") {
  stroke(255 * intensity, 0, 0);
  strokeWeight(2);
  line(from.x, from.y, from.z, to.x, to.y, to.z);

  // Improved wave pattern
  stroke(255, 100);
  let distance = p5.Vector.dist(from, to);
  let steps = distance / (wavelength * 100); // Adjust steps based on wavelength
  let stepSize = 1 / steps;
  
  for (let i = 0; i < 1; i += stepSize) {
    let x = lerp(from.x, to.x, i);
    let y = lerp(from.y, to.y, i) + 10 * sin(TWO_PI * i / wavelength - frameCount * 0.1);
    let z = lerp(from.z, to.z, i);
    point(x, y, z);
  }

  if (label) {
    let mid = p5.Vector.lerp(from, to, 0.5);
    labelAt(mid, label);
  }
}

function labelAt(pos, label) {
  push();
  translate(pos.x, pos.y - 20, pos.z);
  rotateY(-QUARTER_PI);
  rotateX(-QUARTER_PI);
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text(label, 0, 0);
  pop();
}

function reflectBeam(from, to, mirror) {
  let incoming = p5.Vector.sub(to, from).normalize();
  let normal = mirror.getNormal();
  let reflectDir = incoming.copy().reflect(normal);
  let reflectPoint = p5.Vector.add(mirror.pos, reflectDir.copy().mult(390));
  return { reflectDir, reflectPoint };
}

function mousePressed() {
  for (let mirror of mirrors) {
    let d = dist(mouseX - width / 2, mouseY - height / 2, mirror.pos.x, mirror.pos.y);
    if (d < 40) {
      selectedMirror = mirror;
      break;
    }
  }
}

function mouseDragged() {
  if (selectedMirror) {
    selectedMirror.pos.x += movedX;
    selectedMirror.pos.y += movedY;
  }
}

function mouseReleased() {
  selectedMirror = null;
}

function keyPressed() {
  if (selectedMirror) {
    if (keyCode === LEFT_ARROW) {
      selectedMirror.rotate(-0.1);
    } else if (keyCode === RIGHT_ARROW) {
      selectedMirror.rotate(0.1);
    }
  }
}

class Laser {
  constructor() {
    this.pos = createVector(-500, 0, 0);
  }
  display() {
    push();
    translate(this.pos);
    fill(255, 0, 0);
    noStroke();
    sphere(10);
    pop();
  }
}

class BeamSplitter {
  constructor(pos) {
    this.pos = pos;
  }
  display() {
    push();
    translate(this.pos);
    fill(100, 100, 255, 100);
    stroke(255);
    box(20);
    pop();
  }
}

class Mirror {
  constructor(pos, normal) {
    this.pos = pos;
    this.angle = atan2(normal.y, normal.x);
  }

  display() {
    push();
    translate(this.pos);
    rotateZ(this.angle);
    fill(180);
    stroke(255);
    box(5, 60, 60);
    pop();
  }

  getNormal() {
    return createVector(cos(this.angle), sin(this.angle));
  }

  rotate(angleDelta) {
    this.angle += angleDelta;
  }
}

class ObjectCube {
  constructor(pos) {
    this.pos = pos;
  }
  display() {
    push();
    translate(this.pos);
    ambientMaterial(0, 200, 255);
    stroke(0, 255, 255);
    rotateY(frameCount * 0.01);
    box(40);
    pop();
  }
}

class Screen {
  constructor(pos) {
    this.pos = pos;
  }
  display() {
    push();
    translate(this.pos);
    fill(0, 255, 100, 80);
    noStroke();
    plane(100, 100);
    for (let x = -40; x < 40; x += 4) {
      for (let y = -40; y < 40; y += 4) {
        let intensity = 128 + 127 * sin((x * y) / wavelength + frameCount * 0.1);
        stroke(intensity, intensity, 255);
        point(x, y, 1);
      }
    }
    pop();
  }
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.pos = p5.Vector.random3D().mult(random(50, 300));
    this.vel = p5.Vector.random3D().mult(0.2);
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.mag() > 300) this.reset();
    push();
    translate(this.pos);
    noStroke();
    fill(255, 0, 0, 50);
    sphere(1);
    pop();
  }
} 