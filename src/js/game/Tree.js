import PIXI from 'pixi.js';

import {
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';
import GLOBAL from 'Global';

export default class Tree extends PIXI.Sprite {
  update() {
    this.position.x -= GLOBAL.GAME.speed * 0.5;
  }
}
