setInterval(updateGameArea, 20);

var viewPort;
var canvas, ctx;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 400;
ctx.canvas.width = 400;

var gem1 = new Image();
gem1.src = "heart.png";

var gem2 = new Image();
gem2.src = "diamond.png";

var gem3 = new Image();
gem3.src = "emerald.png";

// character object created by function, size and spawn location
var myGamePiece = new Player(100, 100, 560, 560);
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
    if (worldMap[pixelToGridY(nextY)][pixelToGridX(nextX)] != 1 &&
      worldMap[pixelToGridY(nextY + this.width)][pixelToGridX(nextX + this.width)] != 1 &&
      worldMap[pixelToGridY(nextY + this.width)][pixelToGridX(nextX)] != 1 &&
      worldMap[pixelToGridY(nextY)][pixelToGridX(nextX + this.width)] != 1) {
      this.y = nextY;
      this.x = nextX;
    }
    if (foundHeart == true && foundDiamond == true && foundEmerald == true) {
      window.location = "calendar.html";
    }
  }
}


function camera() {

  // minus sign in front: player moves left, camera moves right and vice versa
  // same with up and down
  // - canvas width divided by 2 puts player in center
  var cameraX = -(myGamePiece.x - canvas.width / 2);
  var cameraY = -(myGamePiece.y - canvas.height / 2);
  ctx.save();
  if (myGamePiece.x < canvas.width / 2) {
    cameraX = 0;
  }

  if (myGamePiece.y < canvas.height / 2) {
    cameraY = 0
  }


  if (myGamePiece.x > columns * Tile_W - canvas.width / 2) {
    cameraX = -(columns * Tile_W - canvas.width);
  }

  if (myGamePiece.y > rows * Tile_H - canvas.height / 2) {
    cameraY = -(rows * Tile_H - canvas.height);
  }

  ctx.translate(cameraX, cameraY);
}

window.addEventListener('keydown', function() {
  var n = event.which;
  if (n == 32) {
    console.log(myGamePiece.x, myGamePiece.y)
  }
}, true);

function gemHover() {
  counter++;
  if (counter > 20) {
    counter = 1
    up = !up
  }

  // floating effect, gem moves up and down
  // function constantly getting called by updateGameArea so
  // moves up and down quickly
  if (up) {
    dy = dy + 2
  } else {
    dy = dy - 2
  }
}

// coordinates for gems, didn't want to mix up with player location
var dx, dy;
var counter = 0;
var foundHeart = false;
var up = true;

function gemStone1() {
  dy = 6 * 140 + 50 / 2;
  dx = 11 * 140 + 50 / 2;
  gemHover();

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 90) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 90)) {
    foundHeart = true;
  }

  // draw gem until player finds it
  if (!foundHeart) {
    ctx.drawImage(gem1, dx, dy, 90, 90);
  }
}

var foundDiamond = false;

function gemStone2() {
  dy = 1 * 140 + 50 / 2
  dx = 5 * 140 + 50 / 2
  gemHover();

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 90) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 90)) {

    foundDiamond = true
  }
  if (!foundDiamond) {
    ctx.drawImage(gem2, dx, dy, 90, 90);
  }
}

var foundEmerald = false;

function gemStone3() {
  dy = 6 * 140 + 50 / 2
  dx = 1 * 140 + 50 / 2
  gemHover();

  if ((myGamePiece.x >= dx && myGamePiece.x <= dx + 90) &&
    (myGamePiece.y >= dy && myGamePiece.y <= dy + 90)) {
    foundEmerald = true;
  }

  if (!foundEmerald) {
    ctx.drawImage(gem3, dx, dy, 90, 90);
  }
}

function updateGameArea() {
  camera();
  drawTiles(worldMap);
  myGamePiece.update();
  myGamePiece.newPos();
  gemStone1();
  gemStone2();
  gemStone3();
  ctx.restore();
}