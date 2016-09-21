import PIXI from 'pixi.js';

import {
  GLOBAL_SPEED,
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

export default class Flower extends PIXI.Sprite {
  constructor() {
    super();
    this.tick = 0;
    this.step = Math.random() * 0.03;
  }
  update() {
    this.tick += this.step;
    this.position.x -= GLOBAL_SPEED * 0.5;
    this.rotation = Math.PI / 180 * (Math.sin(this.tick) * 10);
  }
}
