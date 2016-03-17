var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var keystate = [];
var gridlock = null;
var WIDTH = 750, HEIGHT = 650;
var bombImg = new Image(), solidImg = new Image(), breakableImg = new Image(), powerUpImg = new Image(), flameImg = new Image();

bombImg.src = "img/bomb.png";
powerUpImg.src = "img/pups.png";
solidImg.src = "img/solid.png";
breakableImg.src = "img/breakable.png";
flameImg.src = "img/bombSprites.png";
var keys1 = {
  pUp : 87, 
  pDown : 83, 
  pLeft : 65, 
  pRight : 68, 
  pBomb : 32
};
var keys2 = {
  pUp : 38, 
  pDown : 40,
  pLeft : 37, 
  pRight : 39, 
  pBomb : 96
};
canvas.width = WIDTH;
canvas.height = HEIGHT;
var players = [], bombs = [], bricks = [], powerUps = [], flames = [];
var waitToRepeat = false;
var endGame = false;
var invalidBlockAreas = [
  '1,1',
  '1,2',
  '2,1',
  '13,11',
  '12,11',
  '13,10'
]

function main() {
  document.addEventListener("keydown", function(evt) {
    keystate[evt.keyCode] = true;
  });
  document.addEventListener("keyup", function(evt) {
    if (keystate[keys1.pUp] || keystate[keys1.pDown] || keystate[keys1.pLeft] || keystate[keys1.pRight]) {
      players[0].frame = 0; 
    }
    if (keystate[keys2.pUp] || keystate[keys2.pDown] || keystate[keys2.pLeft] || keystate[keys2.pRight]) {
      players[1].frame = 0; 
    }
    delete keystate[evt.keyCode];
  });

  init();

  var loop = function() {
    update();
    draw();

    window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
}

function init() {
  players.push(new player(players.length+1, [1,1]));
  players.push(new player(players.length+1, [13,11]));
  //add bricks
  for (var i = 1; i <= 13; i++){
    if (i % 2 === 0){
      for (var j = 1; j <= 11; j+=2){
        var coord = [i,j];
        var layBlock = getRandom('block');
        if (invalidBlockAreas.indexOf(coord.join()) < 0 && layBlock) {
          bricks.push(new brick(i*50,j*50));
        }
      }
    } else {
      for (var j = 1; j <= 11; j++){
        var layBlock = getRandom('block');
        var coord = [i,j];
        if (invalidBlockAreas.indexOf(coord.join()) < 0 && layBlock) {
          bricks.push(new brick(i*50,j*50));
        }
      }
    }
  }
}

function update() {
  for(var i = 0; i < players.length; i++){
      if (!players[i].playerDead) players[i].update();
    }
  
  if (bombs.length > 0){
    for(var i = 0; i < bombs.length; i++){
      bombs[i].update();
    }
  }
  if (powerUps.length > 0){
    for(var i = 0; i < powerUps.length; i++){
      powerUps[i].update();
    }
  }
  if (flames.length > 0){
    for(var i = 0; i < flames.length; i++){
      flames[i].update(flames[i].coord);
    }
  }

  if (waitToRepeat) {

      var waitTime = 10;
      while (waitTime > 0) {
        waitTime--;
      }
      waitToRepeat = false;

  }

  if (endGame) {
    if (players[0].playerDead && players[1].playerDead && endGame) {
      setTimeout(function(){ 
        alert(winner + "It's a Tie!!!!!!!!!!!!!"); 
        location.reload();
      }, 500);
    } 
    if (endGame) {
      var winner = "White"
      if (players[0].playerDead) winner = "Blue";
      setTimeout(function(){ 
        alert(winner + " Wins!"); 
        endGame = false
        location.reload();

      }, 500);
    }
    endGame = false;
  }
}


function draw()  {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.save();

  ctx.fillStyle = "#fff";

  //draw inside blocks
  
  if (bombs.length > 0){
    for(var i = 0; i < bombs.length; i++){
      // console.log(bombs[i]);
      bombs[i].draw();
    }
  }
  if (powerUps.length > 0){
    for(var i = 0; i < powerUps.length; i++){
      // console.log(powerUps[i]);
      powerUps[i].draw();
    }
  }
  if (bricks.length > 0){
    for(var i = 0; i < bricks.length; i++){
      bricks[i].draw();
    }
  }

  if (flames.length > 0){
    for(var i = 0; i < flames.length; i++){
      flames[i].draw();
    }
  }
  //draw border solid blocks
  for (var i = 0; i < 15; i++){
    ctx.drawImage(solidImg,0, 0, 60, 53, i*50, 0, 50, 50);
    ctx.drawImage(solidImg,0, 0, 60, 53, i*50, 600, 50, 50);
  }
  for (var i = 1; i < 12; i++){
    ctx.drawImage(solidImg,0, 0, 60, 53, 0, i*50, 50, 50);
    ctx.drawImage(solidImg,0, 0, 60, 53, 700, i*50, 50, 50);
  }
  for (var i = 2; i < 13; i+=2){
    for (var j = 2; j < 11; j+=2){
      ctx.drawImage(solidImg,0, 0, 60, 53, i*50, j*50, 50, 50);
    }
  }

  for(var i = 0; i < players.length; i++){
      // console.log(bombs[i]);
      if (!players[i].playerDead) players[i].draw();
  }

  ctx.restore();
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

main();