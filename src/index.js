import Phaser from 'phaser';

var scene = new Phaser.Scene("game");
const config = {
  width: 800,
  height: 600,
  type: Phaser.WEBGL,
  scene: scene
}

const game = new Phaser.Game(config);

scene.init = function () {
  this.score = 0;
  this.lives = 3;
  this.speed = 1.5;
  this.dragon_move = 1;
  this.scoreText;
  this.livesText;
}

scene.preload = function() {
  this.load.image('background', '../assets/background.png');
  this.load.image('icon', '../assets/icon.pgn');
  this.load.image('dragon', '../assets/pet_dragon_new.png');
  this.load.image('warrior', '../assets/warrior.png');
}

scene.create = function() {
  
  var bg = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
  
  // texts
  this.scoreText = this.add.text(100, 16, 'score: ' + this.score, {fontSize: '32px', fill: '#000'});
  this.livesText = this.add.text(16, this.sys.game.config.height - 50, 'Lives: ' + this.lives, {fontSize: '32px', fill: '#000'});

  // player
  this.player = this.add.sprite(100, 150, 'warrior');
  this.player.setScale(0.3);

  // add monster
  this.dragon = this.add.sprite(300, 150, 'dragon');
  this.dragon.setScale(0.1);

  // add gold
  this.gold = this.add.sprite(650, 150, 'gold');
  this.gold.setScale(0.5);
}


scene.update = function () {

  // is mouse click down?
  if (this.input.activePointer.isDown) {
    // move player along the x-axis 
    this.player.x += this.speed;
  };

  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dragon.getBounds())) {
    this.lives--;
    this.livesText.setText('Lives: ' + this.lives);
    this.end();
  };

  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.gold.getBounds())) {
    this.score += 50;
    this.scoreText.setText('score: ' + this.score);
    this.end();
  };
}

scene.end = function() {
  if (this.lives <= 0) {
    this.scene.restart();
  } else {
    this.create();
  }
};
