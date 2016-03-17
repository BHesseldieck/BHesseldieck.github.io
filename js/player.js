function player(number, playerLoc) {
  this.number = number;
  this.playerLoc = playerLoc;
  this.x = (this.playerLoc[0] * 50);
  this.y = (this.playerLoc[1] * 50);
  this.bombInventory = 1;
  this.speed = 3;
  this.bombPower = 1;
  this.playerDead = false;
  this.lastLay = Date.now();
  this.dir = 'down';
  this.frame = 0;
  this.poisonTime = 0;
  this.playerImg = new Image();
  if (this.number === 1) {
    this.keys = keys1;
    this.playerImg.src = "img/WhiteSprite2.png";
  } else {
    this.keys = keys2;
    this.playerImg.src = "img/BlueSprite.png";
  }

  this.die = function() {
    console.log('Boom, player died');
    this.playerDead = true;
    this.dir = 'die';
    endGame = true;
  },

  this.update = function() {
    this.playerLoc = playerCoord(this.x, this.y);
    //if the player is poisoned, reverse up and down controls
    if (Date.now() - this.poisonTime < 5000) {
        if (keystate[this.keys.pDown] && inRange(this.x, this.y, 'ver') && findBlock()) {
        if (this.y <= 50 + this.speed) this.y = 50;
        else this.y -= this.speed;
        if (!findBlock()) this.y += this.speed+1;
        this.x = gridlock;
        this.dir = 'up';
        if (this.frame < 23) this.frame++;
        else this.frame = 0;
      }
        if (keystate[this.keys.pUp] && inRange(this.x, this.y, 'ver') && findBlock()) {
        if (this.y >= 550 - this.speed) this.y = 550;
        else this.y += this.speed;
        if (!findBlock()) this.y -= this.speed+1;
        this.x = gridlock;
        this.dir = 'down';
        if (this.frame < 23) this.frame++;
        else this.frame = 0;
      }
    } else {
        if (keystate[this.keys.pUp] && inRange(this.x, this.y, 'ver') && findBlock()) {
        if (this.y <= 50 + this.speed) this.y = 50;
        else this.y -= this.speed;
        if (!findBlock()) this.y += this.speed+1;
        this.x = gridlock;
        this.dir = 'up';
        if (this.frame < 23) this.frame++;
        else this.frame = 0;
        }
        if (keystate[this.keys.pDown] && inRange(this.x, this.y, 'ver') && findBlock()) {
        if (this.y >= 550 - this.speed) this.y = 550;
        else this.y += this.speed;
        if (!findBlock()) this.y -= this.speed+1;
        this.x = gridlock;
        this.dir = 'down';
        if (this.frame < 23) this.frame++;
        else this.frame = 0;
      }
    }

    if (keystate[this.keys.pLeft] && inRange(this.y, this.x, 'hor') && findBlock()) {
      if (this.x <= 50 + this.speed) this.x = 50;
      else this.x -= this.speed;
      if (!findBlock()) this.x += this.speed+1;
      this.y = gridlock;
      this.dir = 'left';
      if (this.frame < 23) this.frame++;
      else this.frame = 0;
    }
    if (keystate[this.keys.pRight] && inRange(this.y, this.x, 'hor') && findBlock()) {
      if (this.x >= 650 - this.speed) this.x = 650;
      else this.x += this.speed;
      if (!findBlock()) this.x -= this.speed+1;
      this.y = gridlock;
      this.dir = 'right';
      if (this.frame < 23) this.frame++;
      else this.frame = 0;
    }
    if (keystate[this.keys.pBomb]) {
      if (this.bombInventory > 0 && Date.now() - this.lastLay > 300 && this.canLay(this.playerLoc)) {
        bombs.push(new bomb((Math.round((this.x)/50))*50, (Math.round((this.y)/50)) *50, this.bombPower, this.number));
        this.bombInventory --;
        this.lastLay = Date.now();
        console.log("------------------------------");
      }
    }
  };

  this.canLay = function(playerCoordinates) {
    if (bombs.length >= 1) {
      bombs.forEach(function(b) {
        console.log(playerCoordinates[0],playerCoordinates[1],b.x,b.y);
        if ((playerCoordinates[0] === b.x/50 && playerCoordinates[1] === b.y/50)) {
          console.log('cant lay here');
          return false;
        }
      })
    }
    return true;
  };

  this.skull = function(){
    this.poisonTime = Date.now();
  }

  this.draw = function() {
    //cycle trough frames of sprite sheet
    if (this.frame % 3 === 0) var mod = 39 * (this.frame/3);
    else var mod = 39 * ((this.frame-this.frame % 3) / 3);

    var idle = 'down';
    
    //choose correct row of sprites depending on direction
    switch (this.dir){
      case 'up':
        ctx.drawImage(this.playerImg, 2+mod, 101, 32, 46, this.x, this.y - 25, 50, 75);
        break;
      case 'down':
        ctx.drawImage(this.playerImg, 2+mod, 1, 32, 46, this.x, this.y - 25, 50, 75);
        break;
      case 'left':
        ctx.drawImage(this.playerImg, 2+mod, 327, 32, 46, this.x, this.y - 25, 50, 75);
        break;
      case 'right':
        ctx.drawImage(this.playerImg, 2+mod, 51, 32, 46, this.x, this.y - 25, 50, 75);
        break;
      case 'die':
        ctx.drawImage(this.playerImg, 2+mod, 201, 32, 46, this.x, this.y - 25, 50, 75);
        break;
      case 'def':
        ctx.drawImage(this.playerImg, 2, 51, 32, 46, this.x, this.y - 25, 50, 75);
    }
  }
};

function playerCoord(x,y,dir) {
  tileX = Math.round((x)/50);
  tileY = Math.round((y)/50);
  switch (dir){
    case 'right':
      tileX = Math.round((x+51)/50);
      break;
    case 'left':
      tileX = Math.round((x)/50);
      break;
    case 'up':
      tileY = Math.round((y)/50);
      break;
    case 'down':
      tileY = Math.round((y+51)/50);
      break;
  }
  return [tileX, tileY];
};
