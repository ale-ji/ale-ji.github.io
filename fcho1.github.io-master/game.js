startGame();

function startGame() {
  setInterval(updateGameArea, 20);
}

var viewPort;
var canvas, ctx;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 400;
ctx.canvas.width = 400;

var gem1 = new Image();
gem1.src = "Diamond.png";

var gem2 = new Image();
gem2.src = "Gold.png";

var gem3 = new Image();
gem3.src = "Emerald.png";

// character object created by function, size and spawn location
var myGamePiece = new Player(120, 120, 560, 560);
var playerImg = new Image();
playerImg.src = "uni2.png";

const PLAYER_SPEED = 10;

function Player(width, height, x, y) {
  // defines object properties, passed as parameters
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  // uses image as player
  this.update = function() {
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }

  // determines which direction player will move depending on what they press
  this.newPos = function() {

    var nextX = this.x;
    var nextY = this.y;

    // controls on inputs.js
    if (upHeld) {
      nextY -= PLAYER_SPEED;
    }
    if (downHeld) {
      nextY += PLAYER_SPEED;
    }
    if (leftHeld) {
      nextX -= PLAYER_SPEED;
    }
    if (rightHeld) {
      nextX += PLAYER_SPEED;
    }

    // collision detection
    // one tile is certain amount of pixels, map is on worldMap.js
    // if player current position not on "1" tile, able to move
    if (worldMap[currentMap][pixelToGridY(nextY)][pixelToGridX(nextX)] != 1 &&
      worldMap[currentMap][pixelToGridY(nextY + this.width)][pixelToGridX(nextX + this.width)] != 1 &&
      worldMap[currentMap][pixelToGridY(nextY + this.width)][pixelToGridX(nextX)] != 1 &&
      worldMap[currentMap][pixelToGridY(nextY)][pixelToGridX(nextX + this.width)] != 1) {
      this.y = nextY;
      this.x = nextX;
    }
    if (foundDiamond == false && foundGold == false && foundEmerald == false) {
      if (this.x > columns * Tile_H) {
        this.x = 0;
        currentMap++;
      } else if (currentMap > 0 && this.x < 0) {
        this.x = columns * Tile_H;
        currentMap--;
      }
    }
  }
}

function camera() {
  var camerax = -(myGamePiece.x - canvas.width / 2);
  var cameray = -(myGamePiece.y - canvas.height / 2);
  ctx.save();
  if (myGamePiece.x < canvas.width / 2) {
    // console.log("k");
    camerax = 0
  }
  if (myGamePiece.y < canvas.height / 2) {
    cameray = 0
  }
  if (myGamePiece.x > columns * Tile_W - canvas.width / 2) {
    camerax = -(columns * Tile_W - canvas.width);
    // console.log(columns * Tile_W - canvas.width)
  }
  if (myGamePiece.y > rows * Tile_H - canvas.height / 2) {
    cameray = -(rows * Tile_H - canvas.height);
    // console.log(rows * Tile_H - canvas.height / 2)
  }
  ctx.translate(camerax, cameray);
  cameracanMove = true;
}

window.addEventListener('keydown', function() {
  var n = event.which;
  if (n == 32) {
    console.log(myGamePiece.x, myGamePiece.y)
  }
}, true);

var isUP = true;
var dx, dy;
var counter = 0;
var foundDiamond = true;

function gemStone() {
  dy = 6 * 140 + 50 / 2;
  dx = 11 * 140 + 50 / 2;
  // console.log(myGamePiece.x, myGamePiece.y, dx, dy, "diamonds")
  counter++;
  if (counter > 20) {
    counter = 1
    isUP = !isUP
  }
  if (isUP) {
    dy = dy + 2
    // console.log("l")
  } else {
    dy = dy - 2
  }

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 80) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 80)) {
    foundDiamond = false;
  }
  console.log(dy, dx, "k");
  if (foundDiamond) {
    ctx.drawImage(gem1, dx, dy, 80, 80);
    // console.log(x,y,"diamond");
  }
}

var isDown = true;
var fcounter = 0;
var foundGold = true;

function gemStone2() {
  dy = 1 * 140 + 50 / 2
  dx = 5 * 140 + 50 / 2
  // console.log(myGamePiece.x, myGamePiece.y, dx, dy, "diamonds")
  fcounter++;
  if (fcounter > 20) {
    fcounter = 1
    isDown = !isDown
  }
  if (isDown) {
    dy = dy + 2
    // console.log("l")
  } else {
    dy = dy - 2
  }

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 50) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 50)) {
    console.log("k")

    foundGold = false
  }
  if (foundGold) {
    ctx.drawImage(gem2, dx, dy, 50, 50);
    // console.log(x,y,"diamond");
  }
}

var isLeft = true;
var hcounter = 0;
var foundEmerald = true;

function gemStone3() {
  dy = 6 * 140 + 50 / 2
  dx = 1 * 140 + 50 / 2
  // console.log(myGamePiece.x, myGamePiece.y, dx, dy, "diamonds")
  hcounter++;
  if (hcounter > 20) {
    hcounter = 1
    isLeft = !isLeft
  }
  if (isDown) {
    dy = dy + 2
    // console.log("l")
  } else {
    dy = dy - 2
  }

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 50) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 50)) {
    console.log("k")
    foundEmerald = false
  }
  if (foundEmerald) {
    ctx.drawImage(gem3, dx, dy, 50, 50);
    // console.log(x,y,"diamond");
  }
}

var currentMap = 0;

function updateGameArea() {
  camera();
  drawTiles(worldMap[currentMap]);
  myGamePiece.update();
  myGamePiece.newPos();
  gemStone();
  gemStone2();
  gemStone3();
  ctx.restore();
}