var gris=255;
let equis=Math.random()*amp-200+100;
let igriega=Math.random()*alt-200+100;


var arrPlanets=[];
var velSpacial=40000;
var divisorRadio=1.5;
var velStars=1;

  var line = new createjs.Shape();
  line.graphics.setStrokeStyle(4);

  line.graphics.beginStroke("#ffffff");
  line.graphics.moveTo(amp/2, alt/2);

  stage.addChild(line);

  var stars=new createjs.Shape();
  stars.graphics.setStrokeStyle(2);
  stars.graphics.beginStroke("#eeeeee");
  stage.addChild(stars);

function ponPlaneta(a,b){

  let radioCircle=a/divisorRadio;
  gris=b*1.5+31;

//// ajustar bordes
  if(arrPlanets.length==0){
    equis=Math.random() * amp/2 +amp/4;
    igriega=Math.random() * alt/2+alt/4;
    line.graphics.moveTo(equis,igriega)
  }else{
    equis=arrPlanets[arrPlanets.length-1].x+Math.random()*amp/2-amp/4;
    if(equis<0){equis=Math.random()*100}else if(equis>amp){equis=amp-Math.random()*100}
    igriega=arrPlanets[arrPlanets.length-1].y+Math.random()*alt/2-alt/4;
    if(igriega<0){igriega=Math.random()*100}else if(igriega>alt){igriega=alt-Math.random()*100}
  }

  /// remaining stars
  stars.graphics.moveTo(equis-stars.x, igriega);
  stars.graphics.lineTo(equis-stars.x+1,igriega);

  /// ballss
  let s = new createjs.Shape();
  s.graphics.beginFill("rgb("+gris+","+gris+","+gris+")").drawCircle(2, 2, radioCircle);
  s.x = equis
  s.y = igriega;
  stage.addChild(s);

    /// actual constellations
  line.graphics.lineTo(equis,igriega);
  line.graphics.moveTo(equis,igriega);

  // balls effects
  createjs.Tween.get(s)
  .to({scaleX:0.3,scaleY:0.3},
    1000, createjs.Ease.elasticOut );
  arrPlanets.push(s);



}

function quitaPlaneta(p){
  console.log("quito "+p)
  for (let i = 0; i < arrPlanets.length; i++) {
    if(arrPlanets[i].graphics.command.radius==p/divisorRadio){
      handleComplete(arrPlanets[i]);

      arrPlanets.splice(i,1);
      if(arrPlanets.length<1){
          line.graphics.es().clear();

      }
    }
  }
}
