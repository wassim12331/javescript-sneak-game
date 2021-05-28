const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// snake movement speed and the reglue size of the sneak when you start playing 
let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
/// this for sneak tail and length each time snake eats apple 
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

//game loop, this will help The game loop is the overall flow control for the entire game program.
//  It's a loop because the game keeps doing a series of actions over and over again until the user quits
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;
// change snake position to have free mve left or right 
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
// this is for apple with out checkAppleCollision the sneak will
// walk over the apple without eating it
  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();
/// the snake goes faster each time it eats an apple
  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls, once the game sneak touches the wall its game over 
  // and you have to restart again with reset score
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
//////// game over sign 
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient- game over style and its place 
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}
// here the score how its reset each time you die 
// and score color with unlimited score points until user quits 
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
///////// snake looks and colors 
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head--------------------------------------------
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    //---------------------------------------- and each time sneak eats it will grow bigger 
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
// the point food or the thing the sneak will it like apple 
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
//// checkAppleCollision helps the apple to change positions
///each time the snake eats it 
function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up- this will help user to use the buttons, far left buttons on keyboard, or even W A S D  buttons 
  // and its how fast it will move or turn like left or right or up 
  if (event.keyCode == 38 || event.keyCode == 87) {
    //87 is w 
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down-------------------------------------------------------------------------------------------------------------------------------
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 is s-------------------------------------------------------------------------------------------------------------------------
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left---------------------------------------------------------------------------------------------------------------------------------
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 is a-----------------------------------------------------------------------------------------------------------------------------
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right------------------------------------------------------------------------------------------------------------------------------
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 is d---------------------------------------------------------------------------------------------------------------------------
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame();
