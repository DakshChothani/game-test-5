var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;

var warrior, warrior_running,warrior1,warrior_jump;
var back_ground, background_image, invisibleGround;
var start_play,play_img;
var manual,manual_img;
var wall_right,wall_left;

function preload(){
  back_image = loadAnimation("background.png");
  back_image_1 = loadAnimation("rule_background.PNG");
  warrior_running = loadAnimation("Warrior_Walk.gif");
  warrior_idle = loadAnimation("Warrior_IDLE.gif");
  warrior_attack = loadAnimation("Warrior_Attack.gif");
  warrior_skill = loadAnimation("Warrior_Skill.gif");
  warrior_hit= loadAnimation("Warrior_Hit.gif");
  enemy_idle = loadAnimation("Enemy_Idle.gif");
  play_img = loadImage("play.png")
  manual_img = loadImage("manual.png");
  
}

function setup() {
  createCanvas(1900, 960);
  createEdgeSprites();
  
  back_ground = createSprite (1000,100);
  back_ground.addAnimation("displayImage",back_image);
  back_ground.addAnimation("displayRuleImage",back_image_1);
  back_ground.scale = 3;
  back_ground.x = back_ground.width /2;

  warrior = createSprite(500,800);
  warrior.addAnimation("running", warrior_running);
  warrior.scale = 1;
  warrior.addAnimation("idle", warrior_idle);
  warrior.addAnimation("attack", warrior_attack);
  warrior.addAnimation("skill", warrior_skill);
  warrior.addAnimation("hit", warrior_hit);
  
  invisibleGround = createSprite(1000,950,2000,10);
  invisibleGround.visible = false;

  start_play = createSprite(900,280,50,50);
  start_play.scale = 0.8;
  start_play.addImage("playdisplay",play_img);

  manual = createSprite(880,420,50,50);
  manual.scale = 0.8;
  manual.addImage("playdisplay",manual_img);

  wall_left = createSprite(0,750,80,80);
  wall_left.visible = false;

  wall_right = createSprite(1900,750,80,80);
  wall_right.visible = false;

  spwanGroup = new Group();
  bossGroup = new Group();
 
}

function draw() {
  background(180);
  
  // GameState is in play mode  
  if(gameState === 0){
    warrior.changeAnimation("idle",warrior_idle);
    back_ground.velocityX = 0;
    if(mousePressedOver(start_play)) {
      gameState = 1;
      warrior.changeAnimation("running",warrior_running);
      warrior.scale = 1;
    }

    if(mousePressedOver(manual)){
        back_ground.changeAnimation("displayRuleImage",back_image_1);
        back_ground.x = 1000;
        back_ground.y = 500;
        back_ground.scale = 1.2;
        warrior.visible = false;
        manual.visible = false;
        start_play.x = 1200;
        start_play.y = 870;
        if(mousePressedOver(start_play)){
          gameState = 1;
        }
    }
  }

  // GameState is in play mode
  if(gameState === 1) {
  back_ground.y = 100;
  back_ground.velocityX = -6;
  back_ground.scale = 3;
  start_play.visible = false;
  manual.visible = false;
  warrior.visible = true;
  if (back_ground.x < 0){
    back_ground.x = back_ground.width/2;
  }
  warrior.collide(invisibleGround);
  warrior.collide(wall_left);
  warrior.collide(wall_right);
  console.log(frameCount);
  
  if(frameCount > 300 && frameCount < 1300 ){
    spwanEnemy();
    if(keyDown("LEFT_ARROW")){
      warrior.velocityX = -2;
      warrior.velocityY = 0;
    }

    if(keyDown("RIGHT_ARROW")){
      warrior.velocityX = 2;
      warrior.velocityY = 0;
    }
    attack();
  }
  if(frameCount > 1300 && frameCount < 1800){
    reset();
  }

  if(frameCount > 1800 && frameCount < 3300 ){
    spwanEnemy();
    if(keyDown("LEFT_ARROW")){
      warrior.velocityX = -2;
      warrior.velocityY = 0;
    }

    if(keyDown("RIGHT_ARROW")){
      warrior.velocityX = 2;
      warrior.velocityY = 0;
    }
    attack();
  }

  if(frameCount > 3300 && frameCount < 3800){
    reset();
  }

  if(frameCount > 3800 && frameCount < 5800 ){
    spwanEnemy();
    if(keyDown("LEFT_ARROW")){
      warrior.velocityX = -2;
      warrior.velocityY = 0;
    }

    if(keyDown("RIGHT_ARROW")){
      warrior.velocityX = 2;
      warrior.velocityY = 0;
    }
    attack();
  }

  if(frameCount > 5800 && frameCount < 6300){
    reset();
  }

  if(frameCount > 6300 && frameCount < 8800){
    spwanEnemy();
    if(keyDown("LEFT_ARROW")){
      warrior.velocityX = -2;
      warrior.velocityY = 0;
    }

    if(keyDown("RIGHT_ARROW")){
      warrior.velocityX = 2;
      warrior.velocityY = 0;
    }
    attack();
  }
  
  if(frameCount > 8800 && frameCount < 9300){
    reset();
  }

  if(frameCount > 9300 && frameCount < 12300 ){
    spwanEnemy();
    boss();
    if(keyDown("LEFT_ARROW")){
      warrior.velocityX = -2;
      warrior.velocityY = 0;
    }

    if(keyDown("RIGHT_ARROW")){
      warrior.velocityX = 2;
      warrior.velocityY = 0;
    }
    attack();
    bossAttack();
    if(bossGroup.destroyEach()){
      gameState = 2;
    }
  }

  if(gameState === 2){
    back_ground.velocityX = 0;
    warrior.changeAnimation("idle", warrior_idle);
  }
 }

  drawSprites();
  if(gameState === 1){
    if(frameCount > 280 && frameCount < 300 ){
    fill("red");
    textSize(50);
    text("Level 1", 800, 200);
    }

    if(frameCount > 1380 && frameCount < 1400 ){
      fill("red");
      textSize(50);
      text("Level 2", 800, 200);
      }

    if(frameCount > 2480 && frameCount < 2500 ){
       fill("red");
       textSize(50);
       text("Level 3", 800, 200);
      }

    if(frameCount > 3580 && frameCount < 3600 ){
      fill("red");
      textSize(50);
      text("Level 4", 800, 200);
      }

    if(frameCount > 4680 && frameCount < 4700 ){
      fill("red");
      textSize(50);
      text("Level 5", 800, 200);
      }
  }
  if(gameState === 2){
    font(Verdana);
    fill("red");
    textSize(50);
    text(" Congratulations! You Win", 800, 200);
  }
}

function spwanEnemy() {
  if (frameCount % 400 === 0) {
    var enemy = createSprite(1350,770,100,100);
    enemy.addAnimation("enemyIdle",enemy_idle);
    enemy.scale = 0.7;
    enemy.velocityX = -2;
    spwanGroup.add(enemy);
  }
}

function boss() {
  if (frameCount >= 5000) {
    var enemy = createSprite(1350,770,100,100);
    enemy.addAnimation("enemyIdle",enemy_idle);
    enemy.scale = 1;
    enemy.velocityX = -2;
    bossGroup.add(enemy);
  }
}

function reset(){
  warrior.changeAnimation("running",warrior_running);
  warrior.x = 500;
  warrior.y = 800;
  warrior.velocityX = 0;
  warrior.velocityY = 0;
}

function attack(){
  if(keyDown("q")) {
    warrior.changeAnimation("attack", warrior_attack);
    warrior.scale = 1;
    if(spwanGroup.isTouching(warrior)){
      spwanGroup.destroyEach();
    }
  }
  else if(keyDown("c")) {
    warrior.changeAnimation("skill", warrior_skill);
    spwanGroup.destroyEach();
  }
  else{
    warrior.changeAnimation("running",warrior_running);
  }
}

function bossAttack(){
  if(keyDown("q")) {
    warrior.changeAnimation("attack", warrior_attack);
    warrior.scale = 1;
    if(bossGroup.isTouching(warrior)){
      bossGroup.destroyEach();
    }
  }
  else if(keyDown("c")) {
    warrior.changeAnimation("skill", warrior_skill);
    bossGroup.destroyEach();
  }
  else{
    warrior.changeAnimation("running",warrior_running);
  }
}

