var mic;
var fft;
var peakDetect;
let shuffleCount = 1;
let currentSlide = 0;
// 3500 = about a minute
shuffleRate = 3500 * 8;

// Represents which visualizer should currently be displayed
document.cookie="currentVis=0";
let numVisualizers = 4;
// Spectrum of mic sound frequencies
var spectrum;

// For circle visualizer
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
// Sensitivity for circles added
var baseSenisitivity = 160;


// Number lines
let numLines = 1;
let up = true;
let increaseLines = true;


// for amplitude visualizer
var amplitude;
var mapMax = 1.0;


// For DVD visualizer
let dvdLogo;
let x = 320;
let y = 180;
let xspeed = 5;
let yspeed = 4;

let dvdX = 500;
let dvdY = 500;

let dvdLogo0;
let dvdLogo1;
let dvdLogo2;
let dvdLogo3;
let dvdLogo4;
let dvdLogo5;
let dvdLogo6;
let dvdLogo7;
let dvdLogo8;
let dvdLogo9;
let dvdLogo10;
let dvdLogo11;
let dvdLogo12;
let dvdLogo13;
let dvdLogo14;
let dvdLogo15;
let dvdLogos;

// for spinning cubes visualizer
let sizeOfCube = 3000;
let hue = 0;

// For video one's
let vid1;
let vid2;


function preload() {
  vid1 = createVideo("./assets/hall.mp4");
  vid2 = createVideo("./assets/square.mp4");
  vid1.loop()
  vid2.loop()
  vid1.hide();
  vid2.hide();
  img = loadImage('./assets/logo.png');
  img.resize(50, 50);
  dvdLogo = loadImage('./assets/dvdLogos/DVD logo-01.png');
  dvdLogo0 = loadImage('./assets/dvdLogos/DVD logo-01.png');
  dvdLogo1 = loadImage('./assets/dvdLogos/DVD logo-02.png');
  dvdLogo2 = loadImage('./assets/dvdLogos/DVD logo-03.png');
  dvdLogo3 = loadImage('./assets/dvdLogos/DVD logo-04.png');
  dvdLogo4 = loadImage('./assets/dvdLogos/DVD logo-05.png');
  dvdLogo5 = loadImage('./assets/dvdLogos/DVD logo-06.png');
  dvdLogo6 = loadImage('./assets/dvdLogos/DVD logo-07.png');
  dvdLogo7 = loadImage('./assets/dvdLogos/DVD logo-08.png');
  dvdLogo8 = loadImage('./assets/dvdLogos/DVD logo-09.png');
  dvdLogo9 = loadImage('./assets/dvdLogos/DVD logo-10.png');
  dvdLogo10 = loadImage('./assets/dvdLogos/DVD logo-11.png');
  dvdLogo11 = loadImage('./assets/dvdLogos/DVD logo-12.png');
  dvdLogo12 = loadImage('./assets/dvdLogos/DVD logo-13.png');
  dvdLogo13 = loadImage('./assets/dvdLogos/DVD logo-14.png');
  dvdLogo14 = loadImage('./assets/dvdLogos/DVD logo-15.png');
  dvdLogo15 = loadImage('./assets/dvdLogos/DVD logo-16.png');
  dvdLogos = [dvdLogo0, dvdLogo1, dvdLogo2, dvdLogo3, dvdLogo4, dvdLogo5, dvdLogo6, dvdLogo7, dvdLogo8, dvdLogo9, dvdLogo10, dvdLogo11, dvdLogo12, dvdLogo13, dvdLogo14, dvdLogo15]
}


function setup(){
  colorMode(HSB,255);
  imageMode(CORNER);
  // createCanvas(getWidth(), getHeight(), WEBGL);
  createCanvas(getWidth(), getHeight());
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0, 16);
  fft.setInput(mic);
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  peakDetect = new p5.PeakDetect();
}


function draw() {
  switch(parseInt(getCookie("currentVis"))) {
    case 0:
      draw0();
      break;
    case 1:
      draw1();
      break;
    case 2:
      draw2();
      break;
    case 3:
      draw3();
      break;
    case 4:
      // draw4();
      break;
    case 5:
      shuffleCount++;
      shuffleVisualizers();
      break;
    default:
      draw1();
   }
}


/*

VISUALIZER FOR OSCILATING CIRCLES

*/

function draw0() {
  fft.analyze();
  peakDetect.update(fft);
  if ( peakDetect.isDetected ) {
    if (increaseLines) {
      numLines++;
    } else {
      numLines--;
    }
    up = false;
    if (numLines > 5) {
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

/*

VISUALIZER FOR DVD Logo

*/

function draw1() {
  background("#242424");
  image(dvdLogo, x, y, dvdX, dvdY);
  x += xspeed;
  y += yspeed;
  let t = false;
  if (x > width - dvdX + 80 || x < -90) {
    dvdLogo = dvdLogos[Math.floor(random(16))];
    xspeed = -xspeed;
  }
  if (y > height - dvdY + 180 || y < 0 - 195) {
    dvdLogo = dvdLogos[Math.floor(random(16))];
    yspeed = -yspeed;
  }
}

/*

Moving down hallway video visualizer

*/

function draw2() {
  let v1 = vid1.get();
  image(v1, 0, 0, width, v1.height*width/v1.width);
}

/*

3d spinning cubes Visualizer

*/

function draw3() {
  let v2 = vid2.get();
  image(v2, 0, 0, width, v2.height*width/v2.width);
}

/*

3d spinning cubes Visualizer

*/

function draw4() {
  // background(250);
  background(hue,255,255);
  hue += 0.1;
  if (hue > 255) hue = 0;
  for (let i = -600; i < 1200; i+=600) {
    push();
    translate(i, 0, sizeOfCube);
    if (sizeOfCube > 100) {
        sizeOfCube -= 10;
    }
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    texture(img);
    box(300, 300, 300);
  pop();
  }
}


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

function adjustCurrentVisualizer(i) {
  document.cookie = ("currentVis=" + i);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Changes which visualizer is selected, deselects currently selected
function selectItem(selected) {
  adjustCurrentVisualizer(selected);
  let vizs = document.querySelectorAll(".visualizer-item")
  for (viz in vizs) {
    vizs[viz].classList.remove("selected-visualizer");
    if (viz == selected) {
      vizs[viz].classList.add("selected-visualizer");
    }
  }
}

function shuffleVisualizers() {
  if (shuffleCount % shuffleRate == 0) {
    currentSlide++;
  }
  switch(currentSlide%numVisualizers){
    case 0:
      draw0();
      break;
    case 1:
      draw1();
      break;
    case 2:
      draw2();
      break;
    case 3:
      draw3();
      break;
    default:
      break;
  }
}
