//Matter js module aliases
const Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Events = Matter.Events;

//game variables
let engine;
let world;
let balls = [];
let pegs = [];
let bins = [];
let backgroundMusic;
let pegHitSound;
let scoreSound;
const BALL_RADIUS = 10;
const PEG_RADIUS = 8;
const BIN_WIDTH = 60;
const ROWS = 8;
const SPACING = 60;

const SCORES = [50, 100, 500, 1000, 5000, 1000, 500, 100, 50];
const SCORE_COLORS = {
  50: "#f7865c",
  100: "#f16e3a",
  500: "#f7865c",
  1000: "#f16e3a",
  5000: "#f7865c",
};
let totalScore = 0;

function preload() {
  backgroundMusic = loadSound("sounds/background-music.wav");
  pegHitSound = loadSound("sounds/peg-hit.wav");
  scoreSound = loadSound("sounds/score.wav");
}

function setup() {
  createCanvas(600, 800);

  //create engine and world
  engine = Engine.create();
  world = engine.world;

  //reduce gravity (default is 1)
  engine.world.gravity.y = 0.6;

  //create pegs
  createPegs();

  //create bins
  createbins();

  //create walls
  let walls = [
    Bodies.rectangle(width / 2, height, width, 60, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 60, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 60, height, { isStatic: true }),
  ];
  World.add(world, walls);

  // Add collision detection
  Events.on(engine, "collisionStart", function (event) {
    event.pairs.forEach((collision) => {
      // Check if collision involves a ball and a peg
      if (
        collision.bodyA.circleRadius === BALL_RADIUS ||
        collision.bodyB.circleRadius === BALL_RADIUS
      ) {
        if (pegHitSound) {
          pegHitSound.play();
        }
      }
    });
  });

  // Start background music
  if (backgroundMusic) {
    backgroundMusic.setVolume(0.1);
    backgroundMusic.loop();
  }
}

function mousePressed() {
  //create a new ball at mouse position
  let ball = Bodies.circle(mouseX, 30, BALL_RADIUS, {
    restitution: 0.8,
    friction: 0.5,
    density: 0.1,
  });
  balls.push(ball);
  World.add(world, ball);
}

function draw() {
  background("#f5e7ca");
  Engine.update(engine);

  //draw pegs
  fill("#5a2a0a");
  noStroke();
  for (let peg of pegs) {
    circle(peg.position.x, peg.position.y, PEG_RADIUS * 2);
  }

  //draw bins and scores
  let binWidth = BIN_WIDTH;
  let binCount = SCORES.length;
  let startX = (width - binCount * binWidth) / 2;

  //draw background
  rectMode(CORNER);
  for (let i = 0; i < SCORES.length; i++) {
    let x = startX + i * binWidth;

    fill(SCORE_COLORS[SCORES[i]]);
    rect(x, height - 30, binWidth, 100);
  }
  //draw scores
  rectMode(CENTER);
  fill("#2e2108");
  textAlign(CENTER, CENTER);
  textSize(16);
  for (let i = 0; i < SCORES.length; i++) {
    let x = startX + i * binWidth;
    text(SCORES[i], x + binWidth / 2, height - 60);
  }

  //draw bin djividers
  fill("#5a2a0a");
  rectMode(CENTER);
  for (let bin of bins) {
    rect(bin.position.x, bin.position.y, 10, 120);
  }
  //drow balls and check scoring
  fill("#28a499");
  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    circle(ball.position.x, ball.position.y, BALL_RADIUS * 2);

    //check if the ball is in soring position
    if (ball.position.y > height - 100 && ball.velocity.y < 0.1) {
      checkScoring(ball);
      World.remove(world, ball);
      balls.splice(i, 1);
    }
  }
  //draw total score
  fill("#28a499");
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Score: ${totalScore}`, 20, 30);
}

function createPegs() {
  for (let row = 0; row < ROWS; row++) {
    //offset rows
    let offset = row % 2 === 0 ? 0 : SPACING / 2;
    let y = 150 + row * SPACING;

    //how many pegs fit in this row
    let cols = Math.floor(width / SPACING);

    for (let col = 0; col < cols; col++) {
      let x = SPACING + col * SPACING + offset;

      if (x > 50 && x < width - 50) {
        let peg = Bodies.circle(x, y, PEG_RADIUS, {
          isStatic: true,
          restitution: 0.5,
          friction: 0.5,
        });
        pegs.push(peg);
        World.add(world, peg);
      }
    }
  }
}
function createbins() {
  let binCount = SCORES.length;
  let binWidth = BIN_WIDTH;
  let totalWidth = binCount * binWidth;
  let startX = (width - totalWidth) / 2;

  for (let i = 0; i <= binCount; i++) {
    let x = startX + i * binWidth;
    let divider = Bodies.rectangle(x, height - 60, 10, 120, {
      isStatic: true,
    });
    bins.push(divider);
    World.add(world, divider);
  }
}
function checkScoring(ball) {
  let binWidth = BIN_WIDTH;
  let binCount = SCORES.length;
  let startX = (width - binCount * binWidth) / 2;

  //find which bin the ball is in
  let ballX = ball.position.x;
  let binIndex = Math.floor((ballX - startX) / binWidth);

  if (binIndex >= 0 && binIndex < SCORES.length) {
    totalScore += SCORES[binIndex];
    if (scoreSound && !scoreSound.isPlaying()) {
      scoreSound.play();
    }
    return SCORES[binIndex];
  }

  return 0;
}
