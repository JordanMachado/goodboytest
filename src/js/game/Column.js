import PIXI from 'pixi.js';
import {
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

import GLOBAL from 'Global';

export default class Column extends PIXI.Container {
  constructor() {
    super();
    this.passed = false;
    this.top = new PIXI.Sprite(PIXI.loader.resources['assets/images/column.png'].texture);
    this.top.scale = new PIXI.Point(COLUMN_SCALE_X, 1);
    this.bottom = new PIXI.Sprite(PIXI.loader.resources['assets/images/column.png'].texture);
    this.bottom.scale = new PIXI.Point(COLUMN_SCALE_X, 1);
    this.addChild(this.top);
    this.addChild(this.bottom);

  }
  reset() {
    // TODO improve maybe use https://www.npmjs.com/package/yy-noise
    //http://www.michaelbromley.co.uk/blog/90/simple-1d-noise-in-javascript
    this.passed = false;
    const toppos =  Math.random() * (130 - 30) + 30;
    this.top.position.y = -this.top.height + toppos;
    this.bottom.position.y = this.top.position.y + this.top.height + COLUMN_SPACE;
  }
  update() {
    this.position.x -= GLOBAL.GAME.speed;
  }
}
