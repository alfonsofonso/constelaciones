
var stage = new createjs.Stage("micanvas");
var lienzo=document.getElementById("micanvas");
stage.mouseEnabled=false;
createjs.Ticker.setFPS=20;
createjs.Ticker.addEventListener("tick", tick);

var amp=0;
var alt=0;
var radio=0;//hipotenusa del canvas


////// on init
function initVisual(){
  ajustaCanvas();
  analiza();
  //funVisuals=[ponEstrella,spectra,ponPalabra,ponRayo];
  //creaPalabras();
}


//////  /////////////// /////////////  helpers
function tick(event) {
  //stars.x+=velStars;
  line.graphics.s("white").ss(2, "round").mt(equis,igriega);
  //console.log("prex "+prex+" prey " + prey + " equis "+equis+" igriega "+igriega);

  stage.update();
}

function handleComplete(dispon) {
  dispon.removeAllEventListeners();
  stage.removeChild(dispon);
  dispon=null;
}

window.onresize = function(event) {
  ajustaCanvas()
}

ajustaCanvas=function(){
  amp=lienzo.width  = window.innerWidth;
  alt=lienzo.height = window.innerHeight;
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);
}

onload=function(e){
  console.log("onload")
  initVisual();
  //initSound();
}
