var mic;
var fft;

//current size - continuously updated
let xSize = 400;
//minimum size
let minXSize = 400;
//maximum size
let maxXSize = 500;
//change speed for size (how much will the size increase/decrease each frame)
let sizeSpeed = 0.025;
// Logo image
let img;
// Spectrum of mic sound frequencies
var spectrum;




// Number lines
let numLines = 1;
let up = true;
let increaseLines = true;

function preload() {
  img = loadImage('./logo.png');
  img.resize(50, 50);
}


function setup(){
  createCanvas(getWidth(), getHeight());
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0, 16);
  fft.setInput(mic);
}


function draw() {  


  spectrum = fft.analyze();
  console.log(spectrum);
  let baseFrequency = fft.linAverages(5)[2];
  if (baseFrequency > 120) {
    up = true;
  }
  if (up && baseFrequency < 120) {
    if (increaseLines) {
      numLines++;
    } else {
      numLines--;
    }
    up = false;
    if (numLines > 6) {
      increaseLines = false;
    }
    if (numLines < 2) {
      increaseLines = true;
    }
  }

  background("#39FF14"); 
  image(img, getWidth()/2 - 275, getHeight()/2 - 275, 550, 550);
  xSize = map(sin(frameCount * sizeSpeed),-1.0,1.0,minXSize,maxXSize);
  let currentPercent = 1;
  for (let i = 3; i < 2+numLines; i++) {
    push();
    fill('rgba(0,0,0, 0)');
    strokeWeight(7);
    stroke(0); 
    translate(getWidth()/2, getHeight()/2);
    rotate(-.23);
    ellipse(0, 0, xSize*currentPercent, 240*currentPercent);
    currentPercent += ((i*1.0)/4)
    pop();
  } 
}

// function setup() {
//   createCanvas(getWidth(), getHeight());
//   colorMode(HSB);
//   angleMode(DEGREES);
//   mic = new p5.AudioIn();
//   mic.start();
//   fft = new p5.FFT(0.9, 32);
//   fft.setInput(mic);
// }


// function draw() {

//   let size = 10;
//   //minimum size
//   let minSize = 10;
//   //maximum size
//   let maxSize = 240;
//   let sizeSpeed = 0.025;
//   background(240);
//   push();
//   size = map(sin(frameCount * sizeSpeed),-1.0,1.0,minSize,maxSize);
//   strokeWeight(10);
//   stroke(255, 204, 100);
//   ellipse(getWidth()/2, getHeight()/2, size, size);
//   pop();
// }

// function draw() {  
//   background(0);
//   var spectrum = fft.analyze();
//   noStroke();
//   translate(width / 2, height / 2);
//   for (var i = 0; i < spectrum.length; i++) {
//     var angle = map(i, 0, spectrum.length, 0, 360);
//     var amp = spectrum[i];
//     var r = map(amp + 80, 0, 256, 20, getHeight()/2);
//     var x = r * cos(angle);
//     var y = r * sin(angle);
//     stroke(i*10, 255, 255);
//     line(0, 0, x, y);

//   }
// }

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
