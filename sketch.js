var BackGround,Back_ground;
var B_Laser,G_Laser,R_Laser,O_Laser,Blast;
var alienGroup,alienShip1,alienShip2,alienShip3;
var Jet,jetImg;
var alienLaserGroup,LaserGroup, alienGroup,Aliens;
var health = 200,power,score=0;
var gameState=END;

function preload(){
  Blast = loadAnimation("Blast_(3).jpeg","Blast_(4).png","Blast_(5).png","Blast_(6).png","Blast_(7).png","Blast_(8).png","Blast_(9).png");
 
  jetImg = loadAnimation("jet4.png","jet5.png","jet6.png","jet7.png","jet8.png","jet9.png","jet10.png");

  alienShip1 = loadImage("Aliens1.png");
  alienShip2 = loadImage("Aliens2.png");
  alienShip3 = loadImage("Aliens3.png");
  alienGroup = new Group();

  B_Laser = loadImage("BlueLaser.png");
  G_Laser = loadImage("GreenLaser.png");
  R_Laser = loadImage("RedLaser.png");
  O_Laser = loadImage("OrangeLaser.png");

  Back_ground = loadImage("background.png");

  alienLaserGroup = new Group();
  LaserGroup = new Group();
  alienGroup = new Group();
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  BackGround=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  BackGround.addImage(Back_ground);
  BackGround.velocityY = +4;

  Jet = createSprite(displayWidth/2,600,100,100);
  Jet.addAnimation("jet",jetImg);
  Jet.scale = 0.08;
 
 
 
}
function draw(){

if(BackGround.y > displayHeight*3){
  BackGround.y = displayHeight/2;
}
  aliens();
  
 Jet.x = mouseX;

 if(keyWentDown(32)){
  fire();
 }
 if(alienLaserGroup.isTouching(Jet)){
   health = health-0.5;

 }
 if(LaserGroup.isTouching(alienGroup)){
   score=score+1;
  
 }
 if(Jet.isTouching(alienGroup)){
  Jet.addAnimation("b",Blast);
 }
  
 if(gameState === END){
   alienGroup.hide();
   Jet.hide();
   BackGround.velocity.x = 0;
 }
  drawSprites();
  fill("white");
  textSize(20);
  text("|  HEALTH : "+health,displayWidth/2,700);

  text("SCORE : "+score,510,700)
}

function aliens(){
 
  if (frameCount % 100 === 0) {
    Aliens = createSprite(random(200, 900), 0, 100, 100);
    Aliens.velocityY = 4;
    Aliens.scale = 0.2;
   
    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: Aliens.addImage("alien1",alienShip1);
        break;
        case 2: Aliens.addImage("alien2",alienShip2);
        break;
        case 3: Aliens.addImage("alien3",alienShip3);
        break;
       
    }
    Aliens.lifetime = 190;
    alienGroup.add(Aliens);

    for (var i = 0;  i < 5; i++){
      alienLaser = createSprite(Aliens.x,Aliens.y+i*100,10,10);
      alienLaser.addImage(O_Laser);
      alienLaser.scale = 0.02;
      alienLaser.velocityY = 10;
      alienLaserGroup.add(alienLaser);
    }
 
  
}
}
function fire(){
 laser = createSprite(Jet.x,Jet.y,10,10);
 laser.addImage(G_Laser);
 laser.scale = 0.02;
 laser.velocityY = -10;
 LaserGroup.add(laser);
}


