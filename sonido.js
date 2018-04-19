var suena=false;
var arrNotas=[];

Tone.Transport.bpm.value=Onda.tempo;
Tone.Transport.latencyHint="interactive";

var sinte=new Tone.PolySynth(12,Tone.Synth)//.toMaster();
sinte.set({
	"oscillator" : {
		"type" : "sine"//"fmsquare"
	},
	"envelope" : {
		"attack" : 0.0001
	}
});
Tone.Transport.start();

var loop = new Tone.Loop(function(time){
  sinte.triggerAttackRelease(Onda.arr,Onda.duration,time,Onda.velocity);
}, Onda.loop);


tocanota=function(a,b){

  if(b==0){ // note off
    arrNotas.splice(arrNotas.indexOf(a),1); //quito nota de array
		quitaPlaneta(a,b)
  }else{ //// note on
    if(arrNotas.indexOf(a)==-1){ arrNotas.push(a)}; //pongo nota si no esta
		ponPlaneta(a,b);
  }

  if(suena){hazSonido(a,b)}
}


function hazSonido(a,b){
  let notica=Tone.Frequency(a, "midi").toNote();
  if(b!=0){
    sinte.triggerAttack(notica,Tone.Transport.now()+Math.random()/100,b)
  }else{
    sinte.triggerRelease(notica);
  }
}

////// on init
function initSound(){
  tempo(Onda.tempo)
  //loop.start();
	console.log("loop.start(), tempo(), suena=false")
}

tempo=function(a){
	Tone.Transport.bpm.value=a;
	console.log("tempo= "+a)
}
