import {
  START_GAME,
  UPDATE_SCORE,
  GAME_OVER,
} from 'Messages';
import Mediator from 'Mediator';

export default class Score {
  constructor({ player, columns }) {
    this.player = player;
    this.columns = columns;

    this.el = document.createElement('p');
    this.el.innerHTML = 'Score: ';
    this.numberEl = document.createElement('span');
    this.numberEl.innerHTML = 0;
    this.el.appendChild(this.numberEl);
    this.el.classList = 'score';
    document.body.appendChild(this.el);
    this.pts = 0;
    Mediator.on(UPDATE_SCORE, () => {
      this.update();
    });
    Mediator.on(START_GAME, this.show.bind(this));
    Mediator.on(GAME_OVER, this.reset.bind(this));
  }
  hide() {
    TweenMax.set(this.el, { autoAlpha: 0, scale: 0 });
  }
  show() {
    TweenMax.to(this.el, 1.3, {
      autoAlpha: 1,
      scale: 1,
      ease: Elastic.easeInOut,
    });
  }
  update() {
    for (let i = 0; i < this.columns.length; i += 1) {
      if (this.columns[i].position.x + (this.columns[i].width / 2) < this.player.position.x
        && !this.columns[i].passed) {
        this.columns[i].passed = true;
        this.up();
      }
    }
  }
  up() {
    this.pts += 1;
    TweenMax.to(this.el, 0.2, {
      scale: 1.3,
      yoyo: true,
      repeat: 1,
      ease: Quad.easeOut,
    });
    this.numberEl.innerHTML = this.pts;
  }
  reset() {
    this.pts = 0;
    this.hide();
  }
}
