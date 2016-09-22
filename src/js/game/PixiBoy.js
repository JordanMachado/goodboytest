import PIXI from 'pixi.js';


import {
  PIXIBOY_SCALE,

  GRAVITY,
  JUMP_FORCE,
} from 'Const';

import {
  CLICK,
  PIXIBOY_JUMP,
  PIXI_BOY_TOGGLE,
} from 'Messages';
import Mediator from 'Mediator';

export default class PixiBoy extends PIXI.Sprite {
  constructor() {
    super();
    this.pixiTex = PIXI.loader.resources['assets/flyingPixie.png'].texture;
    this.jojoTex = PIXI.loader.resources['assets/flyingJojo.png'].texture;
    this.texture = this.pixiTex;
    this.jojo = false;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale = new PIXI.Point(PIXIBOY_SCALE, PIXIBOY_SCALE);
    this.gravity = GRAVITY;
    this.canJump = true;
    this.velocity = {
      x: 0,
      y: 0,
    };
    Mediator.on(CLICK, this.jump.bind(this));
    Mediator.on(PIXI_BOY_TOGGLE, this.toogleText.bind(this));
  }
  jump() {
    if (!this.canJump || this.position.y + JUMP_FORCE < 20) return;

    TweenMax.to(this.velocity, 0.1, {
      y: JUMP_FORCE,
    });
    Mediator.emit(PIXIBOY_JUMP, { position: this.position });
  }
  update() {
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.rotation = (Math.PI / 180) * this.velocity.y;
  }
  toogleText() {
    // change Jordan texture ^^
    if (!this.jojo) {
      this.texture = this.jojoTex;
    } else {
      this.texture = this.pixiTex;
    }
    this.jojo = !this.jojo;
  }
  die() {
    this.canJump = false;
    TweenMax.to(this, 2, {
      rotation: (Math.PI / 180) * 1080,
    });
  }
}
