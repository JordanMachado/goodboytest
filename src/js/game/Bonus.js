import PIXI from 'pixi.js';
import {
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

import GLOBAL from 'Global';


export default class Bonus extends PIXI.Sprite {
  constructor() {
    super();
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.type = 0;
    this.tick = 0;
    this.active = false;
    this.amplitude = Math.random() * ((1 - 0.5) + 0.5);
  }
  set({ type, texture, position }) {
    this.type = type;
    this.texture = texture;
    this.active = false;
    this.position.x = position.x;
    this.position.y = position.y;
    this.scale = new PIXI.Point(1, 1);
  }
  hit() {
    TweenMax.to(this.scale, 0.2, {
      x: 0,
      y: 0,
    });
  }
  update() {
    this.tick += 0.1;
    this.position.x -= GLOBAL.GAME.speed;
    this.position.y += Math.sin(this.tick) * this.amplitude;
    if (!this.active) {
      this.scale.x = GLOBAL.SOUND.volume + 0.5;
      this.scale.y = GLOBAL.SOUND.volume + 0.5;
    }

  }
}
