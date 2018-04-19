
var analyser=Tone.context.createAnalyser();
var canvas = lienzo;
var c=lienzo.getContext("2d");
var altolas= 10;
var hori=780;
var reductor=32;

function analiza(){
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 1;
  sinte.connect(analyser);
  //draw();
}

function draw() {// draw an oscilloscope of the current audio source
  //var now=new Date().getTime();
  //if(now-before>50){log("NOT DRAWING THIS ONE");return}
  drawVisual = requestAnimationFrame(draw);

    //if(arrNotas.length==0&&arrMotive.length==0){return}
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);

  c.lineWidth = 6;
  c.strokeStyle = 'rgb(156, 156, 156)';
  c.beginPath();
  let x=amp/2;
  let y=alt/2+hori;
  var r=1;

  for(var i = 0; i < bufferLength; i++) {
    r = dataArray[i] / reductor;
    x=x+Math.sin(toRadians(i+90))*r;
    y=y+Math.cos(toRadians(i+90))*r;
    // * altolas;

    if(i === 0) {
      c.moveTo(x, y);
    } else {
      c.lineTo(x, y);
    }
    //x = x + sliceWidth ;
  }

  //c.lineTo(amp+24, alt/2);
  c.lineTo(amp/2, alt/2+hori);
  c.fillStyle="rgba(32,32,32,.5)";
    c.stroke()
    c.fill();
};


function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
