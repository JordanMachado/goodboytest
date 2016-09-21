import PIXI from 'pixi.js';
import {
  PIXIBOY_SCALE,
  GRAVITY,
  JUMP_FORCE,
} from 'Const';

export default class PixiBoy extends PIXI.Sprite {
  constructor() {
    super();
    this.texture = PIXI.loader.resources['assets/flyingPixie.png'].texture;
    this.jojoTex = PIXI.loader.resources['assets/flyingPixie.png'].texture;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale = new PIXI.Point(PIXIBOY_SCALE, PIXIBOY_SCALE);
    this.gravity = GRAVITY;
    this.canJump = true;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }
  jump() {
    if (!this.canJump) return;
    TweenMax.to(this.velocity, 0.1, {
      y: JUMP_FORCE,
    });
    TweenMax.to(this.position, 0.1, {
      y: this.position.y - 5,
    });
  }
  update() {
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation = (Math.PI / 180) * this.velocity.y;
  }
  jojo() {
    // change Jordan texture ^^
    this.texture = this.jojoTex;
  }
  normal() {
    // change to original texture
  }
  die() {
    this.canJump = false;
    TweenMax.to(this, 2, {
      rotation: (Math.PI / 180) * 1080,
    });
  }
}
