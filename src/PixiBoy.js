import PIXI from 'pixi.js';

export default class PixiBoy extends PIXI.Sprite {
  constructor({ texture }) {
    super(texture);
    this.gravity = 0.4;
    this.velocity = {
      x: 0,
      y: 0,
    };
    console.log('pixi boy');
  }
  onClick() {
    TweenMax.to(this.velocity, 0.1, {
      y: -10,
    });
  }
  update() {
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation = (Math.PI / 180) * this.velocity.y;
  }
}
