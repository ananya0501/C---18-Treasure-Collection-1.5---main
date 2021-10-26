// Creating the variables

var edges;
var path, boy, cash, diamonds, jwellery, sword, gameOver;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, gameOverImg ;
var cashG, diamondsG, jwelleryG, swordG;
var treasureCollection = 0;

// Game States

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload()
{
  // Loading the images & animations

  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup()
{
  // Creating the canvas
  createCanvas(windowWidth,windowHeight);

  // Creating the path
  path = createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  // Creating the boy sprite
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("Running",boyImg);
  boy.scale = 0.15;
  //boy.debug = true;
  boy.setCollider("rectangle",0,0,1200,1400);
  
  // Creating the game over sprite
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  // Creating the groups

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordG = new Group();
}

function draw() 
{
  // Creating the Game States

  if(gameState === PLAY)
  {
    // Setting the background color
    background(0);

    // Movement of the boy using the mouse
    boy.x = World.mouseX;
  
    // Making the edges sprite
    edges = createEdgeSprites();

    // Colliding the boy with the edges
    boy.collide(edges);
  
    // Resetting the path's position
    if(path.y > height )
    {
      path.y = height/2;
    }
  
    // Calling the cash, diamonds, jwellery & sword functions

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    // Destroying the groups & increasing the score when the boy touches the treasure

    if (cashG.isTouching(boy)) 
    {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }

    else if (diamondsG.isTouching(boy)) 
    {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }

    else if(jwelleryG.isTouching(boy)) 
    {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }

    // Ending the game state when the boy touches the sword group
    else if(swordG.isTouching(boy))
    {
      gameState = END;
    }
  }

  if( gameState === END)
  {      
    // boy.addAnimation("SahilRunning",gameOverImg);
    // boy.x=width/2;
    // boy.y=height/2;
    // boy.scale=0.6;
        
    // Making the boy invisible
    boy.visible = false;

    // Setting the velocity for the path
    path.velocityY = 0;

    // Making the game over image visible
    gameOver.visible = true;
    
    // Destroying the groups once the game is over

    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordG.destroyEach();
        
    // Setting the velocity for the groups once the game is over

    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordG.setVelocityYEach(0);
  }

  drawSprites();

  // Displaying the treasure
  textSize(20);
  fill("Yellow")
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
}

// Creating the functions for spawning treasure

function createCash()
{
  if (World.frameCount % 200 == 0) 
  {
    cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
   cash.addImage(cashImg);
   cash.scale = 0.12;
   cash.velocityY = 5;
   cash.lifetime = 200;
   cashG.add(cash);
  }
}

function createDiamonds() 
{
  if (World.frameCount % 320 == 0) 
  {
    diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = 200;
    diamondsG.add(diamonds);
 }
}

function createJwellery() 
{
  if (World.frameCount % 410 == 0) 
  {
    jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 5;
    jwellery.lifetime = 200;
    jwelleryG.add(jwellery);
  }
}

function createSword()
{
  if (World.frameCount % 530 == 0) 
  {
    sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 4;
    sword.lifetime = 200;
    swordG.add(sword);
  }
}