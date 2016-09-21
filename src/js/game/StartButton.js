import PIXI from 'pixi.js';

import {
  START_GAME,
} from 'Messages';
import Mediator from 'Mediator';

export default class StartButton extends PIXI.Sprite {
  constructor({ container, renderer }) {
    super();
    this.container = container;
    this.renderer = renderer;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.texture = PIXI.loader.resources['assets/playButton.png'].texture;
    this.interactive = true;
    this.position.x = this.renderer.width / 2;
    this.position.y = this.renderer.height / 2;
    this.scale = new PIXI.Point(0.3, 0.3);
    this.mouseup = this.mouseup.bind(this);
  }
  mouseup() {
    Mediator.emit(START_GAME);
    TweenMax.to(this.position, 0.5, {
      y: -this.height,
      ease: Expo.easeOut,
      onComplete: () => {
        this.container.removeChild(this);
      },
    });
  }
}
