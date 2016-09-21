import PIXI from 'pixi.js';
import {
  PIXIBOY_SCALE,
  GRAVITY,
  JUMP_FORCE,
} from 'Const';

export default class PixiBoy extends PIXI.Sprite {
  constructor({ texture }) {
    super(texture);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale = new PIXI.Point(PIXIBOY_SCALE, PIXIBOY_SCALE);
    this.gravity = GRAVITY;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }
  onClick() {
    TweenMax.to(this.velocity, 0.1, {
      y: JUMP_FORCE,
    });
  }
  update() {
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation = (Math.PI / 180) * this.velocity.y;
  }
}
