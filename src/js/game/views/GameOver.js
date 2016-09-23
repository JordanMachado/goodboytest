import {
  GAME_OVER,
} from 'Messages';
import Mediator from 'Mediator';

export default class GameOver {
  constructor() {
    this.el = document.createElement('p');
    this.el.id = 'gameover';
    this.el.innerHTML = 'Gameover';
    document.body.appendChild(this.el);
    Mediator.on(GAME_OVER, this.show.bind(this));
    window.go = this;
    this.hide();
  }
  hide() {
    TweenMax.set(this.el, { autoAlpha: 0, y: 300 });
  }
  show() {
    TweenMax.to(this.el, 3, {
      autoAlpha: 1,
      y: 0,
      ease: Elastic.easeOut,
    });
  }
}
