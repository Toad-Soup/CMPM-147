// sketch.js - contains the code from glitch.com
// Author: Torrey Spear
// Date: 4/12/15

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

/* exported setup, draw */

const backgroundColor = "#f4ab45";
const skyColor = "#7b97be";
const middleGroundColor = "#cf6218";
const foregroundColor = "#010101";
const moonColor = "#fff9e3";
const cloudColor = "#efd7bf"

//const w = 600;
//const h = 400;

//variables for Prof Mode's cloud generation
//let skySeed = 0;
let updateTime = 0.1;
let lastUpdate = 0;
let timeScale = 0.0001;
let driftSpeed = 1; // base drift speed of clouds
let parallaxStrength = 0.45; // difference factor between bottom (far) and top (near) cloud movement
let xOffset = 0;

let randSeed = 0;


class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

//the following code was from Prof Modes and Raven Cruz on the discord
function redo(){
  clear();
  
  randSeed = random(0, 2556);
  noiseSeed(randSeed);
  xOffset = 0;
  mountains();
}

// setup() function is called once when the program starts
function setup() {
    
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  //createCanvas(width, height);
  pixelDensity(1);
  mountains();
  //createButton("reimagine").mousePressed(() => redo())
  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
      //this is also professor Mode's code to move the clouds across the screen
  if (millis() - lastUpdate > updateTime * 1000) {
    xOffset = (width / TWO_PI) * sin(millis() * 0.00005 * driftSpeed);
    mountains(millis());
    lastUpdate = millis();
  }

}

function mountains(t = 0){
  noiseSeed(randSeed);
  background(skyColor); // Sky blue
  
  //create the moon***********************************
  //TODO MOVE THE LOCATION OF THE MOON UP
  push();
  translate(width/2, height*0.20);
  stroke(moonColor);
  fill(moonColor);
  ellipse(-300, 45, 130, 130);
  pop();
  
  //clouds******************************************************
  //the following code section ending at updatePixels() is from
  //Prof Wes Modes, slightly altered by me for the color and transparent background
  loadPixels();
  let level = 450;
  let scale = 0.09;

  //let skyColor = [135, 190, 235];
  //let cloudColor = [255, 255, 255]; // only one cloud color

  for (let y = 0; y < height; y++) {
    let yParallaxFactor = map(y, 0, height, parallaxStrength, 0);

    for (let x = 0; x < width; x++) {
      let mod = map(y, 0, height, 10, 1);
      //let squish = scale / mod;

      let nx = ((x - width / 2) * scale / mod) + (xOffset * yParallaxFactor * scale);
      let ny = (y * scale / mod);

      let c = level * noise(nx, ny, t * timeScale);

      if (c > 220) {
        let col = color(cloudColor); // Only cloud color

        let pix = 4 * (y * width + x);
        pixels[pix]     = red(col);
        pixels[pix + 1] = green(col);
        pixels[pix + 2] = blue(col);
        pixels[pix + 3] = 255; // fully opaque
      }
    }
  }
  updatePixels();
  
  
  let baseHeight = height * 0.7;
  
  //futhest background********************************
  //code from perlin noise videso in README
  noStroke();
  fill(backgroundColor);
  beginShape();
  var xoff = 4;
  let y = 0;
  for (let i = 0; i < width; i++) {
    //let x = (width * i) / steps;
    y = map(noise(xoff), 0, 1, 100, 200) + 50;
    vertex(i, y);
    
    xoff += 0.02;
  }
  vertex(width, height);
  vertex(0,height )
  endShape(CLOSE);
  //end back mountain**************************************  
  
  //setting up variables for the fron mountains which have a V shape
  //code from perlin noise vids in README and gpt to help debug and refine
  let noiseStep = 0.005;
  xoff = 0; // offset for different layers
  let layerHeight = baseHeight + 0 * 60;
  let vDepth = 0.4;
  let vCurve = 2 ; // deeper layers = sharper V
  
  //middleground************************************************
  fill(middleGroundColor);
  beginShape();
  let center1 = width / 2;

  for (let x = 0; x <= width; x++) {
    let distanceFromCenter = abs(x - center1);
    let normDist = distanceFromCenter / center1;
    let shapedV = pow(normDist, vCurve);
    let vFactor = lerp(1, 1- vDepth, shapedV);
    
    let y = map(noise(xoff), 0, 1, layerHeight - 80, layerHeight + 80) * vFactor +50;
    vertex(x, y);
    xoff += noiseStep;
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  //END MIDDLEGROUND**************************************************
  
  
  //foreground********************************************************
  fill(foregroundColor);
  beginShape();
  layerHeight = baseHeight + 1 * 60;
  vCurve = 2 + 1 * 0.5;
  vDepth = 0.4;
  xoff = 3 * 100;
  for (let x = 0; x <= width; x++) {
    let distanceFromCenter = abs(x - center1);
    let normDist = distanceFromCenter / center1;
    let shapedV = pow(normDist, vCurve);
    let vFactor = lerp(1, 1- vDepth, shapedV);

    let y = map(noise(xoff), 0, 1, layerHeight - 80, layerHeight + 80) * vFactor +50;
    vertex(x, y);
    xoff += noiseStep;
  }

  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  //END FOREGROUND******************************************************
  
}


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

