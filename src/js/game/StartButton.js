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

    TweenMax.set(this, { alpha: 0 });
    TweenMax.set(this.scale, { x: 0, y: 0 });

    TweenMax.to(this.scale, 1.4, {
      x: 0.3,
      y: 0.3,
      ease: Elastic.easeInOut,
      delay: 1,
    });
    TweenMax.to(this, 1, {
      alpha: 1,
      delay: 1.5,
    });
  }
  mouseup() {
    Mediator.emit(START_GAME);
    TweenMax.to(this, 0.5, {
      alpha: 0,
      ease: Expo.easeOut,
    });
    TweenMax.to(this.position, 0.5, {
      y: 0,
      ease: Expo.easeOut,
      onComplete: () => {
        this.container.removeChild(this);
      },
    });
  }
}
