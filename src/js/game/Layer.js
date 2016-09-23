import PIXI from 'pixi.js';
import GLOBAL from 'Global';
import {
  RESIZE,
} from 'Messages';
import Mediator from 'Mediator';

export default class Layer extends PIXI.extras.TilingSprite {
  constructor({ texture, width, height, damping, position }) {
    super(texture, width, height);
    this.damping = damping || 0;
    this.position.x = position.x || 0;
    this.position.y = position.y || 0;

    Mediator.on(RESIZE, this.resize.bind(this));
    // this.tileScale = new PIXI.Point(2,2)
  }
  update() {
    this.tilePosition.x -= GLOBAL.GAME.speed * this.damping;
  }
  resize() {
    this.width = GLOBAL.GAME.width;
  }
}
