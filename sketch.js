var PLAY = 1;
var gameState = "play";
var tower,towerImg
var door,doorImg,doorGroup
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var iBlock,iBlockGroup;
var spookySound;

function preload() {
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")
}

function setup () {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  iBlockGroup = new Group();
}

function draw() {
  
  spookySound.loop();
  
  if (gameState === "play") {
    
     if(tower.y > 400) {
    tower.y = 300
  }
  
  if (keyDown("left")) {
    ghost.x = ghost.x-3;
  }
  
  if (keyDown("right")) {
    ghost.x = ghost.x+3;
  }
  
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.2;
  
  if (climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    
  }
  
  if(iBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }
  spawnDoors();
  
  drawSprites();
  } 
  
  if (gameState === "end") {
    textSize(30);
    fill("yellow");
    text("Game Over",230,250);
  }
  
  
  
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(200,-50,10,10);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 5;
    door.lifetime = 120;
    doorGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 5;
    climber.lifetime = 120;
    climber.debug = true;
    climberGroup.add(climber);
    
    iBlock = createSprite(200,15);
    iBlock.width = climber.width;
    iBlock.height = 2;
    iBlock.x = climber.x;
    iBlock.velocityY = 5;
    iBlock.lifetime = 120;
    iBlock.debug = true;
    iBlockGroup.add(iBlock);
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1;
  }
  
}