
var hayMidi=false;
var entradas=[];
var salidas=[];

var arturiaOut;
var launchpadOut;
var oxygen;
var teensy;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
  console.log('MIDI Access Object', midiAccess.inputs.size);
  if(midiAccess.inputs.size==0){hayMidi=false;return}
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    inputs = midi.inputs.values();
    outputs= midi.outputs.values();
  if(midiAccess.inputs.size==0){hayMidi=false;return}

  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      entradas.push(input);
      input.value.onmidimessage = onMIDIMessage;
  }
  for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
      salidas.push(output);
  }
  for(var i=0;i<salidas.length;i++){
    if(salidas[i].value.manufacturer=="Arturia"){arturiaOut=salidas[i];}
    else if(salidas[i].value.name=="Launchpad Mini"){launchpadOut=salidas[i]}
    else if(salidas[i].value.name=="USB Oxygen 8 v2"){oxygen=salidas[i]}
    else if(salidas[i].value.name=="Teensy"){teensy=salidas[i]}
    else{console.log("hay algo conectado!: "+salidas[i].value.name)}
  }
}

function onMIDIFailure(e) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(message) {
    data = message.data;
  if (message.target.name=="Launchpad Mini"){
    console.log("launchpad "+data);
  }else if (message.target.name=="Arturia MINILAB"){//CASIO USB-MID
    console.log("arturia "+data);
  }else if(message.target.name=="USB Oxygen 8 v2"){
    //console.log("oxigen "+data);
  }else{
      console.log("otra cosa "+data);
  }
      tocanota(data[1],data[2]);
  //console.log('MIDI:'+data+" "+ data[0] + " "+ data[1]+" "+data[2]); // MIDI data [144, 63, 73]
}
