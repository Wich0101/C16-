
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var red, blue, green, pink;

var score;

function preload(){
  
  backgroundImage = loadImage("background0.png");  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}


function setup() {
  createCanvas(400, 400);
  
  //crear fondo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  //crear arco para disparar las flechas
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  //Inicializar el Score así: score = 0; 
  score = 0; 
  //grupos
  redB = new Group();
  blueB = new Group();
  greenB = new Group();
  pinkB = new Group();
 
  arrowGroup = new Group();  
}

function draw(){
 background(0);
 
 text ("Puntuación: " + score, 300, 50);
 
 if(gameState === PLAY){
    // mover el suelo

    scene.velocityX = -3; 

    //reiniciar el fondo
    if (scene.x < 0){
     scene.x = scene.width/2;
    }
    //mover arco
    bow.y = World.mouseY      
     
    //Liberar las flechas al presionar la barra espaciadora
    if (keyWentDown("space")) {
      createArrow();  
    }

    //crear enemigos continuos
   var select_balloon = Math.round(random(1,4));
  
   if (World.frameCount % 100 == 0){
     switch(select_balloon ){
       case 1:redBalloon();
       break;
       case 2:blueBalloon();
       break;
       case 3:pinkBalloon();
       break;
       case 4:greenBalloon();
       break;
       default:
       break;
     }
   }
    
    //explotar globos y elegir un grupo para terminar el juego 

    /*LUIS EMANUEL, COMO ESTAMOS COMPARANDO LA COLISIÓN ENTRE 2 GRUPOS NO IMPORTA EL ORDEN
    ADEMÁS VAMOS A USAR LA FUNCION destroyEach(), para destruir cada uno de los elementos del grupo*/

    if(arrowGroup.isTouching(redB)){
      redB.destroyEach(); 
      arrowGroup.destroyEach();

      gameState = END;
    }
    
    if (arrowGroup.isTouching(blueB)){
      score = score + 1;  
      blueB.destroyEach();
      arrowGroup.destroyEach(); 
    }
    
    if (arrowGroup.isTouching(greenB)){
      score = score + 1;
      greenB.destroyEach();
      arrowGroup.destroyEach();
    }

    if (arrowGroup.isTouching(pinkB)){
      score = score + 1;
      pinkB.destroyEach();
      arrowGroup.destroyEach();
    }

    //AGREGA LAS DEMÁS CONDICIONES PARA LOS GLOBOS QUE NOS FALTAN
   
  }else if (gameState === END) {      
    bow.destroy();      
    scene.velocityX = 0;
  }

/*
 if (frameCount>250) {
   red.lifetime = 0;
   blue.lifetime = 0;
   green.lifetime = 0;
   pink.lifetime = 0;
   gameState = END; 
   LUIS EMMANUEL, ESTO ESTABA CAUSANDO EL 
   OVERLAP PORQUE LA CONDICIÓN NUNCA SE VA A DETENER EN LA SIGUIENTE CLASE VEMOS COMO CAMBIAR EL LIFETIME 
 }*/

  drawSprites();
}

function redBalloon() {
  red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}


function createArrow() {
  arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);

}
