import PIXI from 'pixi.js';

export default class Layer extends PIXI.extras.TilingSprite {
  constructor({ texture, width, height, speed, position }) {
    super(texture, width, height);
    this.speed = speed || 0;
    this.position.x = position.x || 0;
    this.position.y = position.y || 0;
  }
  update() {
    this.tilePosition.x -= this.speed;
  }
}
