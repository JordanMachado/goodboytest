import PIXI from 'pixi.js';

import {
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';
import GLOBAL from 'Global';

export default class Flower extends PIXI.Sprite {
  constructor() {
    super();
    this.tick = 0;
    this.step = Math.random() * 0.03;
  }
  update() {
    this.tick += this.step;
    this.position.x -= GLOBAL.GAME.speed * 0.5;
    this.rotation = Math.PI / 180 * (Math.sin(this.tick) * 10);
    this.scale.y = 1;
    this.scale.y += GLOBAL.SOUND.volume * 0.3;
  }
}
