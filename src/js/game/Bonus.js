import PIXI from 'pixi.js';
import {
  GLOBAL_SPEED,
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

export default class Bonus extends PIXI.Sprite {
  constructor() {
    super();
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.type = 0;
    this.tick = 0;
    this.amplitude = Math.random() * (1 - 0.5) + 0.5;
  }
  set({ type, texture, position }) {
    this.type = type;
    this.texture = texture;
    this.position.x = position.x;
    this.position.y = position.y;
  }
  update() {
    this.tick += 0.1;
    this.position.x -= GLOBAL_SPEED;
    this.position.y += Math.sin(this.tick) * this.amplitude;
  }
}
