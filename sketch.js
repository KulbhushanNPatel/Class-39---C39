// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY
// https://editor.p5js.org/codingtrain/sketches/LbNt1nyxE

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let obs1;
let obs2;
let obs3;

let bird;
let world, engine;
let mConstraint;
let slingshot, slingshotImg, catapult;

let dotImg;
let boxImg;
let bkgImg;

function preload() {
  dotImg = loadImage('./assets/angry.png');
  boxImg = loadImage('./assets/blocks.png');
  bkgImg = loadImage('./assets/bg.png');
  slingshotImg = loadImage('./assets/slingshot.jpg');
}

function setup() {
  const canvas = createCanvas(1500, 600);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(800, 300 - i * 75, 150, 100);
  }

  obs1 = new Box(1300, 300, 150, 150);
  obs2 = new Box(1300, 310, 150, 150);
  obs3 = new Box(1300, 315, 150, 150); 
 

  // let catapult = createSprite(500, 300, 100, 100);
  // catapult.addImage("catapult",slingshotImg);

  image(slingshotImg, 500, 300, 100, 100);

  bird = new Bird(500, 300, 25);

  slingshot = new SlingShot(500, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for HiDPI displays
  // mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}


function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
  obs1.show();
  obs2.show();
  obs3.show();

  
  
  drawSprites();
}


function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(500, 300, 25);
    slingshot.attach(bird.body);
  }

}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

