import PIXI from 'pixi.js';

import {
  GLOBAL_SPEED,
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

export default class Tree extends PIXI.Sprite {
  update() {
    this.position.x -= GLOBAL_SPEED * 0.5;
  }
}
