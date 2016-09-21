import PIXI from 'pixi.js';
import {
  GLOBAL_SPEED,
  COLUMN_SCALE_X,
  COLUMN_SPACE,
} from 'Const';

export default class Column extends PIXI.Container {
  constructor() {
    super();
    this.top = new PIXI.Sprite(PIXI.loader.resources['assets/column.png'].texture);
    this.top.scale = new PIXI.Point(COLUMN_SCALE_X, 1);
    this.bottom = new PIXI.Sprite(PIXI.loader.resources['assets/column.png'].texture);
    this.bottom.scale = new PIXI.Point(COLUMN_SCALE_X, 1);
    this.addChild(this.top);
    this.addChild(this.bottom);

  }
  reset() {
    // TODO improve maybe use https://www.npmjs.com/package/yy-noise
    //http://www.michaelbromley.co.uk/blog/90/simple-1d-noise-in-javascript
    const toppos =  Math.random() * (130 - 30) + 30;
    this.top.position.y = -this.top.height + toppos;
    this.bottom.position.y = this.top.position.y + this.top.height + COLUMN_SPACE;
  }
  update() {
    this.position.x -= GLOBAL_SPEED;
  }
}
