import PIXI from 'pixi.js';

export default class Layer extends PIXI.extras.TilingSprite {
  constructor({ texture, width, height, speed, position }) {
    super(texture, width, height);
    this.speed = speed || 0;
    this.position.x = position.x || 0;
    this.position.y = position.y || 0;
    // this.tileScale = new PIXI.Point(2,2)
  }
  update() {
    this.tilePosition.x -= this.speed;
  }
  resize(width, height) {
    console.log(this.width);
    this.width = width;
  }
}
