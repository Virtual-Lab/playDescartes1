var context;
var img;
var osc = [];
var playing = [];
var points = [];
var freq = [];
var colour = [];
var display = [];
var displayScales = [];
var env = [];
var fact = 2;
var kons = 95040*fact;
var relation, a = 1, b = 1;
var dot = [];
var diagram, response, instructions, synthControl;

function preload() {
  img = loadImage('images/1656_descartes_HexachordCircle_brockt_1978_40.jpg');
};

function setupPoints() {

  //relation =1;

  points[0] = [363, 118, 500, 245, 446, 450, 355, 500, 162, 446, 108, 255];
  points[1] = [196, 414, 156, 268, 268, 164, 350, 162, 455, 275, 410, 415];
  points[2] = [408, 282, 378, 382, 279, 407, 230, 382, 208, 272, 280, 210];
  //points = points * 0.5;

  console.log("Points", points);

  freq[0] = [kons/540, kons/486, kons/432, kons/405, kons/360, kons/324];
  freq[1] = [kons/360, kons/324, kons/288, kons/540, kons/480, kons/432];
  freq[2] = [kons/480, kons/432, kons/384, kons/360, kons/320, kons/288];
  
  colour[0] = [200, 100, 100, 100];
  colour[1] = [100, 200, 100, 100];
  colour[2] = [100, 100, 200, 100];

  displayScales = ["Box b mollis", "Box naturalis", "Box quadratum"];
  displayNotes = ["do", "re", "mi", "fa", "sol", "la"];
                  



  for (var i = 0; i<3; i++) display[i] = [];
};

function setup() {
  
  diagram = document.getElementById('diagram');
  response = document.getElementById('response');

  setText();

  var output = createCanvas(img.width/2, img.height/2);
  output.parent(diagram);
  Synthesizer.init();
  
  background(255);
  image(img, 0, 0, img.width/2, img.height/2);
  console.log("Image-Dimensions: ", img.width/2, img.height/2)
  setupPoints();
  

  for (var i=0; i<3; i++) {
    osc[i] = [];
    playing[i] = [];
    setOsc(i);
    setPoints(i);
  };

}

function setText () {
  fill(150);
  textSize(32);
  text1 = createP('Click points to play:');
  text2 = createP("F = " + kons/540 + " Hz");
  button = createButton('stop sound')
  
  text1.position(25, 70);
  button.position(25, 105);
  text2.position(25, 125);

  button.mousePressed(stopSound);

  synthControl = createDiv("<h3>Sound Settings<h3>");
  synthControl.attribute("id", "synth");
  synthControl.parent(response);
  
  output = createDiv('<h3>Currently playing:</h3>');
  output.attribute('id', 'output');
  output.parent(response);

  fill(240);
  rect(480, 0, 100, 150);
};

function stopSound () {
  for (zahl= 0; zahl<3; zahl++) {
    for (i=0; i < freq[zahl].length; i++) {
      playing[zahl][i]=false;
      osc[zahl][i].hold = false;
      osc[zahl][i].stop();
      display[zahl][i].remove(); 
    }
  }
  fill(240);
  rect(48, 0, 100, 150);
  
}

function setOsc(zahl) {
  
  //envelope(zahl, 0);
  
  for (i=0; i < freq[zahl].length; i++) {
    playing[zahl][i]=false;
    osc[zahl][i] = new Sound(freq[zahl][i]);
    // osc[zahl][i].setType('sine');
    // osc[zahl][i].freq(freq[zahl][i]);
    // osc[zahl][i].amp(0);
    // osc[zahl][i].start();
  };
};

function setPoints(zahl) {
  
  noStroke(); 
  fill(colour[zahl]);

  dot[zahl] = [];
  
  for (i=0; i < points[zahl].length; i=i+2) {
    ellipse(points[zahl][i],points[zahl][i+1],20,20);
  };
};

// When the user clicks the mouse
function mousePressed() {
  
  for (zahl = 0; zahl<3; zahl ++) {
    for (i=0; i < freq[zahl].length; i++) {
    // Check if mouse is inside the circle
    var d = dist(mouseX, mouseY, points[zahl][i*2], points[zahl][(i*2)+1]);
    if (d < 10) {
    // look if the sound already plays or not
      if (!playing[zahl][i]) {
        /// play oscillator
        osc[zahl][i].play(freq[zahl][i]);
        // fill(colour[zahl]);
        display[zahl][i] = createP(
          displayScales[zahl]+" "+displayNotes[i]+': frequency = '+ round(freq[zahl][i]));
        display[zahl][i].parent(output);

        playing[zahl][i] = true;
        
      } else if (!osc[zahl][i].hold) {
       // ramp amplitude to 0 over 0.2 seconds
      osc[zahl][i].stop();
      playing[zahl][i] = false;
      display[zahl][i].remove();
      }
  }
    }
  }

};

function mouseReleased() {

  for (zahl = 0; zahl<3; zahl ++) {
    for (i=0; i < freq[zahl].length; i++) {
      // Check if mouse is inside the circle
      var d = dist(mouseX, mouseY, points[zahl][i*2], points[zahl][(i*2)+1]);
      if (d < 10) {
        // look if the sound already plays or not
        if (playing[zahl][i] && !osc[zahl][i].hold) {
          osc[zahl][i].stop();
          display[zahl][i].remove();
          playing[zahl][i] = false;
        }
      }
    }
  }


}

function draw() {
  
  //background(220, 220, 220);

};







  


