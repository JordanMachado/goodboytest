import PIXI from 'pixi.js';

import {
  RESIZE,
  CLICK_START,
  SOUND_LOADED,
  GAME_OVER,
} from 'Messages';
import Mediator from 'Mediator';
import GLOBAL from 'Global';

export default class StartButton extends PIXI.Sprite {
  constructor({ container }) {
    super();
    this.container = container;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.texture = PIXI.loader.resources['assets/images/playButton.png'].texture;
    this.interactive = true;
    this.position.x = GLOBAL.GAME.width / 2;
    this.position.y = GLOBAL.GAME.height / 2;
    this.scale = new PIXI.Point(0.3, 0.3);
    if (GLOBAL.CLIENT.device === 'desktop') {
      this.mousedown = this.click.bind(this);
    } else {
      this.touchend = this.click.bind(this);
    }

    TweenMax.set(this, { alpha: 0 });
    TweenMax.set(this.scale, { x: 0, y: 0 });
    Mediator.on(RESIZE, this.resize.bind(this));
    Mediator.on(SOUND_LOADED, this.show.bind(this));
  }
  show() {

    TweenMax.to(this.scale, 1.4, {
      x: 0.3,
      y: 0.3,
      ease: Elastic.easeInOut,
    });
    TweenMax.to(this, 1, {
      alpha: 1,
      delay: 0.5,
    });
  }
  click() {
    console.log(CLICK_START,'fdp');
    Mediator.emit(CLICK_START);
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
  resize() {
    this.position.x = GLOBAL.GAME.width / 2;
    this.position.y = GLOBAL.GAME.height / 2;
  }
}
